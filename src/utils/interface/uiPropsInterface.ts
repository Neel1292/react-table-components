// button
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

// dropdown
export interface DropdownFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  labelClass?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  error?: string;
  touched?: boolean;
  options?: { value: string; label: string }[];
  hideLabel?: boolean;
  disabled?: boolean;
}

// input
export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  labelClass?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  inputClass?: string;
  disabled?: boolean;
  hideLabel?: boolean;
}

// textarea
export interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
  placeholder?: string;
  value?: string;
  labelClass?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: string;
  touched?: boolean;
  hideLabel?: boolean;
  inputClass?: string;
  disabled?: boolean;
}

export interface PriceFieldProps {
  label: string;
  name: string;
  prefix: string;
  postfix: string;
  type?: string;
  placeholder?: string;
  value?: string;
  labelClass?: string;
  spaceClass?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  options?: { value: string; label: string }[];
  hideLabel?: boolean;
  disabled?: boolean;
}

export interface DropdownFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  labelClass?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  error?: string;
  touched?: boolean;
  options?: { value: string; label: string }[];
  hideLabel?: boolean;
  disabled?: boolean;
}

//section description
export interface SectionProps {
  title: string | undefined;
  paragraphs?: string | null;
  listItems?: string[];
  tags?: string[];
}

//category card

export interface CategoryItem {
  _id?: string;
  images?: string[];
  slug?: string;
  label?: string;
  title?: string;
  name?: string;
  description?: string;
}
//banner
export interface BannerProps {
  title: string;
  description: string;
  placeholder?: string;
  images: string[];
}

// product card
export interface ProductCardProps {
  id: string;
  productName: string;
  productImage: string;
  rating: number;
  ratingNumber: number;
  cutPrice?: number | string;
  newPrice: number | string;
  href?: string;
  slug: string;
  categoryId?: { _id: string; name: string }[] | string[];
  technology?: { _id: string; name: string }[] | string[];
  fav?: any[];
  isFree?: boolean;
  isInCartFromDb?: boolean;
}

//TemplateCardProps
export interface TemplateCardProps {
  title: string;
  // description: string;
  id: string;
  features: string[];
  cutPrice: number;
  newPrice: number;
  slug: string;
  ratingNumber: number;
  rating: number;
  image: string;
  categoryId?: { _id: string; name: string }[] | string[];
  technology?: { _id: string; name: string }[] | string[];
}

// main template card
export interface MainTemplateCardProps {
  title: string;
  slug: string;
  cutPrice: number;
  id: string;
  newPrice: number;
  ratingNumber: number;
  rating: number;
  image: string;
  categoryId?: { _id: string; name: string }[] | string[];
  technology?: { _id: string; name: string }[] | string[];
}

// breadcrumb
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  title: string;
  author?: string;
  date?: string;
  lastUpdateDate?: string;
}

// preview box
export type PreviewBoxProps = {
  type: "image" | "iframe";
  src?: string;
  slides: Array<{ src: string }>;
  index?: number;
  onOpen: () => void;
};

//AccordionProps
export interface FilterOption {
  label: string;
  count: number;
}

export interface FilterSection {
  title: string;
  type: "checkbox" | "radio";
  options: FilterOption[];
}

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen: boolean;
  className?: string;
}

// cart item
export interface ItemCardProps {
  id?: string;
  productImage: string;
  productName: string;
  paymentType: string;

  category:
    | string
    | { _id: string; name: string }[]
    | { _id: string; name: string };
  technology:
    | string
    | { _id: string; name: string }[]
    | { _id: string; name: string };
  rating?: number; // 0 to 5
  reviewsCount?: number;
  price: number;
  subtotal: number;
  href?: string;
  onRemove?: () => void;
  isFree?: boolean;
}

//wish list
export interface WishlistItemProps {
  itemId: string;
  template: any;
  isInCart: boolean;
  onAddToCart: (template: any) => void;
  slug: string;
  onRemove: (templateId: string) => void;
  onRemoveFromCart: (template: any) => void;
}

// basic table
export type Column<RowT> = {
  header: string;
  accessor?: string | ((row: RowT, index: number) => unknown);
  render?: (row: RowT, index: number) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

export type ActionItem<RowT> = {
  label: string;
  className?: string;
  onClick: (row: RowT, index: number) => void;
};

export type BasicTableProps<RowT> = {
  columns: Column<RowT>[];
  data: RowT[];
  total: number;
  isLoading?: boolean;
  rowKey?: (row: RowT, index: number) => string | number;
  actions?:
    | ((row: RowT, index: number) => React.ReactNode)
    | ActionItem<RowT>[];
  emptyMessage?: string;
  loaderRowCount?: number;
  page: number;
  setPage: (item: number) => void;
  limit: number;
  totalPages: number;
};

// template billign
export interface TemplateBillingCardProps {
  title: string;
  href: string;
  category?:
    | { _id: string; name: string }[]
    | { _id: string; name: string }[]
    | string;
  technology?:
    | { _id: string; name: string }[]
    | { _id: string; name: string }[]
    | string;
  rating: { stars: number; reviews: number };
  slug?: string;
  imageSrc: string[];
  altText?: string;
  className?: string;
  id?: string;
}

export interface DownloadCardItemProps {
  image: string;
  title: string;
  category:
    | string
    | { _id: string; name: string }[]
    | { _id: string; name: string };
  technology:
    | string
    | { _id: string; name: string }[]
    | { _id: string; name: string };
  rating: number;
  reviews: number;
  sales: string;
  license: string;
  slug?: string;
  isReview?: boolean; // if user is editing review
  reviewDate?: string; // optional, when editing
  existingReview?: string;
  reviewId?: string; // ✅ New: ID of the existing review
  reviewExists?: boolean; // ✅ add this
  onWriteReview?: (review: string, rating: number) => void;
  setRefetch: any;
  onDownload?: () => void;
  templateId?: string; // ✅ add this for API download
  notifyLabel?: string;
  checked?: boolean;
  onNotifyChange?: (checked: boolean) => void;
  isDeleted?: boolean; // ✅ New: indicates if the template is deleted
  purchaseDate?: string;
}

export interface BlogCardInterface {
  image: string;
  title: string;
  profile: string;
  author: string;
  date: string | any;
  readTime: string | any;
  slug: string;
}

export type Category = {
  id: string | null;
  label: string;
};
