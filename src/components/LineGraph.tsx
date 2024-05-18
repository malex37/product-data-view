import { Sale } from "@/model/SaleData";
import rootStore from "@/store/rootStore";
import { Line } from "@nivo/line";
import { createSelector } from "@reduxjs/toolkit";

const MonthNumToTag: { [id: number]: string } = {
  // Set to start on 1
  [0]: "JAN",
  [1]: "FEB",
  [2]: "MAR",
  [3]: "APR",
  [4]: "MAY",
  [5]: "JUN",
  [6]: "JUL",
  [7]: "AUG",
  [8]: "SEP",
  [9]: "OCT",
  [10]: "NOV",
  [11]: "DEC"
};

export default function LineGraph(props: { productId: string, saleType: 'retail' | 'wholesale' }) {
  /**
   * from graph tracking by week the datapoint will be { x: <week number of date>, y: <sum of points in week> }
   */
  console.log(`Attempting to create graph for product ${props.productId}`);
  // Transform a sales array to x,y elements
  const processSales = (paramSales: any) => {
    if (!paramSales) {
      return [{
        id: "Retail sales",
        data: []
      }]
    }
    console.log(`ParamSales: ${JSON.stringify(paramSales)}`);
    const sales = paramSales[props.productId] as Sale[];
    const retailData: { x: string, y: number }[] = [];
    const wholesaleData: { x: string, y: number }[] = [];
    sales.map(sale => {
      const salesWeekDate = new Date(sale.weekEnding);
      // MonthNumber
      const month = salesWeekDate.getUTCMonth();
      // Assuming dates are local
      retailData[month] = retailData[month] ? { x: retailData[month].x, y: retailData[month].y + sale.retailSales } : { x: MonthNumToTag[month], y: sale.retailSales }
      wholesaleData[month] = wholesaleData[month] ? { x: wholesaleData[month].x, y: wholesaleData[month].y + sale.wholesaleSales } : { x: MonthNumToTag[month], y: sale.wholesaleSales }
    });
    console.log(`Returning ${JSON.stringify(retailData)}`);
    // Now transform to an id?
    const res = [
      {
        id: "Retail",
        data: retailData,
        color: "hsl(222, 22%, 68%)",
      },
      {
        id: "Wholesale",
        data: wholesaleData,
        color: "rgba(70,168,246, 1)"
      }
    ];
    console.log(`Graph object result ${JSON.stringify(res)}`);
    return res;
  };
  const productSalesSelector = createSelector([(state) => state.products.sales], processSales);
  const productSales = productSalesSelector(rootStore.getState());
  const graphYsizeToWindow = window.innerHeight * 0.45; // 45%
  const graphXsizeToWindow = window.innerWidth * 0.66; // 66%
  const graphInternalMarginValue = 100;
  return (
    <div id="linegraph-container" className="h-ful w-full m-4 p-3 floating-container">
      {
        productSales ?
          <>
            <p className="text-3xl">Retail sales</p>
            <Line
              data={productSales}
              xScale={{
                type: 'point',
              }}
              yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
              }}
              width={graphXsizeToWindow}
              height={graphYsizeToWindow}
              margin={{
                top: 6,
                right: graphInternalMarginValue - 10,
                bottom: graphInternalMarginValue,
                left: 20,
              }}
              yFormat=" >-.2f"
              curve="cardinal"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 10,
                tickPadding: 6,
                tickRotation: 0,
                legendOffset: 24,
                legendPosition: 'start',
                truncateTickAt: 0
              }}
              axisLeft={null}
              enableGridX={false}
              enableGridY={false}
              animate={false}
              pointSize={2}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabel="data.yFormatted"
              pointLabelYOffset={-12}
              enableTouchCrosshair={true}
              useMesh={true}
              colors={['#9999cc', '#46a8f6']}
              legends={[
                {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]}
            />
          </>
          :
          <>Loading</>
      }
    </div>
  );
}
