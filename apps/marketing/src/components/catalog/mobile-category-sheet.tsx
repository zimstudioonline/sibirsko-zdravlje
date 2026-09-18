import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@repo/ui";
import { ListFilter } from "lucide-react";
import { CategoryNav } from "./category-nav";

/** Dugme "Kategorije" koje na mobilnom otvara listu kategorija u Sheet-u. */
export function MobileCategorySheet({ activeSlug }: { activeSlug?: string }) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <ListFilter className="size-4" />
            Kategorije
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Kategorije</SheetTitle>
          </SheetHeader>
          <div className="px-4 pb-6">
            <CategoryNav activeSlug={activeSlug} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
