import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export interface TodoStoreProps {
    id : number
    title : string,
    description : string,
    date : string
}

export let todos : Writable<[] | TodoStoreProps[]> = writable([]);