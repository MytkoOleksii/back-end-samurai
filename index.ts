import {app} from "./src/app";
import {runDb} from "./src/db/db";

const port = process.env.PORT || 3000

const startApp = async  () => {
    await  runDb()
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
}
console.log("start")
startApp()