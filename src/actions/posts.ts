import {fetchMainPosts, Item} from "../hackernews/api"
import { Dispatch } from "redux"


export const FETCH_ITEMS = 'FETCH_ITEMS'

interface FetchItemsAction {
    type: typeof FETCH_ITEMS
    items: Item[]
  }

export function fetchItems (items: Item[]): FetchItemsAction {
    return {
      type: FETCH_ITEMS,
      items,
    }
}

export const fetchMainItems = () => async (
  dispatch: Dispatch
) => {
    const posts = await fetchMainPosts("top")
    dispatch(fetchItems(posts))
};

export type PostActionTypes = FetchItemsAction
