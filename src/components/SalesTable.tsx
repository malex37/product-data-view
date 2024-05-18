import { Sale } from "@/model/SaleData";
import { useState } from "react";
import { useSelector } from "react-redux";

const SortOrderDef = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

type SortOrder = keyof typeof SortOrderDef;

const Headers = {
  WEEK: 'WEEK ENDING',
  RETAIL: 'RETAIL SALES',
  WHOLESALE: 'WHOLESALE SALES',
  UNITS: 'UNITS SOLD',
  MARGIN: 'RETAILER MARGIN',
} as const;

type Header = keyof typeof Headers;

const HeaderToSaleAttribute: { [Key in Header]: string } = {
  WEEK: "weekEnding",
  RETAIL: "retailSales",
  WHOLESALE: "wholesaleSales",
  UNITS: "unitsSold",
  MARGIN: "retailerMargin",
} as const;

export default function SalesTable(props: { productId: string }) {
  let sales = useSelector((state: any) => {
    return state.products.sales[props.productId];
  });

  let [sortOrder, setSortOrder] = useState(SortOrderDef.DESC as SortOrder);
  let [indicator, setIndicator] = useState('indicate-desc');
  let [localSales, setLocalSales] = useState(sales);

  // TODO: Use invoking element to only switch the indicator of the column
  // This could mean there will need to be a state per column?

  // @ts-ignore next-line
  const reSort = (e: any, sortController: Header) => {
    // console.log(`start sorted in order ${sortOrder} and showing indicator ${indicator}`);
    // Toggle sorting assuming that sort is already what is indicated, similar to excel (I think)
    if (sortOrder === SortOrderDef.DESC) {
      setSortOrder(SortOrderDef.ASC);
    }
    if (sortOrder === SortOrderDef.ASC) {
      setSortOrder(SortOrderDef.DESC);
    }
    if (indicator === 'indicate-asc') {
      setIndicator('indicate-desc');
    }
    if (indicator === 'indicate-desc') {
      setIndicator('indicate-asc');
    }
    const resorted = [...localSales]
    resorted.sort((current: Sale, toCompare: Sale) => {
      let currentSaleFieldValue: string | number | Date = current[HeaderToSaleAttribute[sortController as Header] as keyof Sale];
      let toCompareSaleFieldValue: string | number | Date = toCompare[HeaderToSaleAttribute[sortController as Header] as keyof Sale];
      if (sortController === 'WEEK') {
        currentSaleFieldValue = new Date(current.weekEnding);
        toCompareSaleFieldValue = new Date(toCompare.weekEnding);
      }
      if (sortOrder === 'ASC') {
        if (currentSaleFieldValue > toCompareSaleFieldValue) {
          return 1;
        } else if (toCompareSaleFieldValue > currentSaleFieldValue) {
          return -1;
        }
        // they're equal
        return 0;
      } else if (sortOrder === 'DESC') {
        if (currentSaleFieldValue < toCompareSaleFieldValue) {
          return 1;
        } else if (toCompareSaleFieldValue < currentSaleFieldValue) {
          return -1;
        }
        // they're equal
        return 0;
      }
      return 0;
    });
    console.log(`Starting ${JSON.stringify(localSales)}`);
    console.log(`Resorted ${JSON.stringify(resorted)}`);
    setLocalSales([...resorted]);
  }
  return (
    <div className="w-full floating-container">
      <table className="w-full">
        <thead>
          <tr>
            {
              Object.keys(Headers).map((headkey: string) => {
                return (
                  <th key={headkey} className={`${indicator}`} onClick={(e) => reSort(e, headkey as Header)}>{Headers[headkey as Header]}</th>
                );
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            localSales.map((sale: Sale) => {
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
