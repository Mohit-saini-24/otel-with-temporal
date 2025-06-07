import axios from "axios";

async function testActivity(args){
    console.log("testActivity");
    // throw new Error("injected error")
    return true;
}
const activity2 = async () => {
    const {data} = await axios.get("http://localhost:5001/test1");
    return data;
}
const sleepms = (ms) => new Promise((res) => setTimeout(res,ms))
export default {
    testActivity,
    activity2,
    sleepms
}