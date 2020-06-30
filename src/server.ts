import app from "./app";
import DataContext from './dbConnection';

const PORT = process.env.PORT || 3001;

DataContext.Connect();

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});