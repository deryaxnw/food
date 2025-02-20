// import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
// import Image from "next/image";
import { notFound } from "next/navigation";

// import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";

import RestaurantHeader from "./components/Header";

interface RestaurantMenuPage {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPage) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }
  const restaurant = await db.restaurant.findUnique({ where: { slug } });
  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantHeader restaurant={restaurant}/>
    </div>
  );
};

export default RestaurantMenuPage;

//http://localhost:3000/fsw-donalds/menu?consumptionMethod=dine_in
