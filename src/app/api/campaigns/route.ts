import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { parse } from "url";
import categoriesJson from "../../actions/categories.json";

export async function POST(req: Request) {
  function findParentCategories(term: string) {
    const matchedParents = [];
    for (const [parent, children] of Object.entries(
      categoriesJson.categories
    )) {
      if (parent.toLowerCase().includes(term)) {
        matchedParents.push(parent);
      } else {
        const matchedChild = children.some((child) =>
          child.toLowerCase().includes(term)
        );
        if (matchedChild) {
          matchedParents.push(parent);
        }
      }
    }
    return matchedParents;
  }

  const getCategories = (query: string) => {
    const searchTerms = query.split(",").map((term: string) => term.trim());
    let parentCategories: string[] = [];
    searchTerms.forEach((term: string) => {
      const parents = findParentCategories(term);
      parentCategories = [...parentCategories, ...parents];
    });

    const uniqueSet = new Set(parentCategories);
    parentCategories = Array.from(uniqueSet);
    return parentCategories;
  };
  try {
    const creator = await getCurrentUser();
    let body = await req.json();
    let { query } = body;
    query = query.toLowerCase();
    let campaigns: any = [];
    let categories;
    if (creator) {
      if (query == "") {
        categories = creator?.categories;
      } else if (query == "all") {
        categories = getCategories("");
      } else {
        categories = getCategories(query);
      }
      campaigns = await prisma.campaign.findMany({
        where: {
          visibility: "PUBLIC",
          OR: [
            {
              targetCategory: {
                hasSome: categories,
              },
            },
            {
              targetCategory: {
                isEmpty: true,
              },
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          brand: {
            select: {
              id: true,
              logo: true,
              name: true,
            },
          },
        },
        cacheStrategy: {
          ttl: 60,
          swr: 10,
        },
      });
    }
    return NextResponse.json({ success: true, campaigns: campaigns });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errors: error });
  }
}

export async function GET(req: Request) {
  try {
    var { query } = parse(req.url || "", true);
    const { status }: any = query;
    const user = await getCurrentUser();
    const campaigns = await prisma?.campaign.findMany({
      where: {
        collaboratorIds: {
          has: user?.id,
        },
        status: status,
      },
      include: {
        brand: {
          select: {
            id: true,
            logo: true,
            name: true,
          },
        },
      },
      cacheStrategy: {
        ttl: 60,
        swr: 10,
      },
    });
    return NextResponse.json({ success: true, campaigns: campaigns });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errors: error });
  }
}
