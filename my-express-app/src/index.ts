import express from "express";

const app = express();
const port = 3000;

app.get("/", (_req: any, res: any) => {
  res.send("Hello, Express with typescript");
});
app.get("/about", (_req: any, res: any) => {
  res.send("this is page about");
});
app.get("/contact", (_req: any, res: any) => {
  res.send("Please Contact me at 08192882829");
});
app.use('*', (_req : any, res: any) => {
    res.status(404).send('page not found please check')
})

app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
