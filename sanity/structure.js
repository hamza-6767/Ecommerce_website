// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('E-commerce')  // Changed from 'Blog' to reflect your actual content
    .items([
      S.documentTypeListItem('product').title('Products'),
      // Remove or comment out these lines since you don't have these schemas
      // S.documentTypeListItem('category').title('Categories'),
      // S.documentTypeListItem('author').title('Authors'),
      // S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['product'].includes(item.getId()),
      ),
    ])