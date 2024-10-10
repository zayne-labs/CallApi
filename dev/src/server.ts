import { callApi } from "@zayne-labs/callapi";

const { data } = await callApi("https://dummyjson.com/products/:id", {
	method: "GET",
	params: { id: 3 },
});

console.info(data);
