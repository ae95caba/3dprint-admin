import client from "../client";

async function get_AndDo_(route, handleResponse_) {
  try {
    const response = await client({
      method: "get",
      url: route,
    });
    handleResponse_(response);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export default get_AndDo_;
