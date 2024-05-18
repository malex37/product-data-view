import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from '@/model/Product';
import { Sale } from "@/model/SaleData";
import * as jd from "@/assets/data.json";

function delay() {
  return new Promise(resolve => setTimeout(resolve, 200));
}

export const getProduct = createAsyncThunk('products/fetch', async () => {
  const res = { status: 200, body: { products: jd } };
  console.log(`Retrieved product data ${JSON.stringify(res.body.products)}`)
  await delay();
  // @ts-ignore next-line
  return res.body.products["default"];
})

export const productStore = createSlice({
  name: 'products',
  initialState: {
    items: {} as { [productId: string]: Product },
    sales: {} as { [productId: string]: Sale[] },
  },
  reducers: {
    addProduct: (state, action) => {
      state.items[action.payload.id] = action.payload;
    },
    addSaleToProduct: (state, action) => {
      state.sales[action.payload.productId] = action.payload.data;
    }
  },
  extraReducers(builder) {
    // @ts-ignore next-line no-unused-parameters
    builder.addCase(getProduct.fulfilled, (state, action) => {
      const rawProd = action.payload[0];
      console.log(`Building state with ${JSON.stringify(rawProd)}`);
      // sorting won't affect graph drawing, nivo takes data as a point
      // and adds all values by x position regardles of order they're in the data array
      const sortedSales = rawProd.sales.sort((current: Sale, toCompare: Sale) => {
        const currentDate = new Date(current.weekEnding);
        const toCompareDate = new Date(toCompare.weekEnding);
        if (currentDate > toCompareDate) {
          return 1;
        } else if (toCompareDate > currentDate) {
          return -1;
        }
        // they're equal
        return 0;
      });
      return {
        items: {
          [rawProd.id]: {
            title: rawProd.title,
            subtitle: rawProd.subtitle,
            id: rawProd.id,
            brand: rawProd.brand,
            imageURI: rawProd.image,
            tags: rawProd.tags.map((tag: string) => { return { text: tag } }),
          }
        },
        sales: {
          [rawProd.id]: sortedSales.map((sale: any) => {
            return {
              ...sale,
            };
          })
        }
      }
    })
  }
})

export default productStore.reducer;
