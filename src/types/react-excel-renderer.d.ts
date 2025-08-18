declare module "react-excel-renderer" {
  export function ExcelRenderer(
    file: File,
    callback: (err: any, resp: { rows: any[][]; cols: any[] }) => void
  ): void;
}
