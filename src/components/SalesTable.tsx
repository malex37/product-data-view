import { Sale } from "@/model/SaleData";
import { useSelector } from "react-redux";

export default function SalesTable(props: { productId: string }) {
  const sales = useSelector((state: any) => {
    return state.products.sales[props.productId];
  });
  return (
    <div className="w-full floating-container">
      <table className="w-full">
        <thead>
          <tr>
            <th>WEEK ENDING</th>
            <th>RETAIL SALES</th>
            <th>WHOLESALE SALES</th>
            <th>UNITS SOLD</th>
            <th>RETAILER MARGIN</th>
          </tr>
        </thead>
        <tbody>
          {
            sales.map((sale: Sale) => {
              return (
                <tr key={props.productId + sale.weekEnding}>
                  <td className="dataField">{sale.weekEnding}</td>
                  <td className="dataField dataFieldRight">${sale.retailSales}</td>
                  <td className="dataField dataFieldRight">${sale.wholesaleSales}</td>
                  <td className="dataField dataFieldRight">{sale.unitsSold}</td>
                  <td className="dataField dataFieldRight">${sale.retailerMargin}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}
