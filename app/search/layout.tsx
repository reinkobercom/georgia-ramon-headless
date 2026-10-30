import Collections from "components/layout/search/collections";
import FilterList from "components/layout/search/filter";
import { sorting } from "lib/constants";
import ChildrenWrapper from "./children-wrapper";
import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container-shop flex flex-col gap-8 py-8 text-cocoa-900 md:flex-row md:py-12">
        <div className="order-first w-full flex-none md:max-w-[170px]">
          <Collections />
        </div>
        <div className="order-last min-h-screen w-full md:order-none">
          <Suspense fallback={null}>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Suspense>
        </div>
        <div className="order-none flex-none md:order-last md:w-[150px]">
          <FilterList list={sorting} title="Sortieren nach" />
        </div>
      </div>
    </>
  );
}
