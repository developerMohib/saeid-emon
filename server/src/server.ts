import app from "./app";
import { config } from "./config";
import connectDB from "./db/db";

async function main() {
  try {
    // await mongoose.connect(config.databaseUrl as string);
    await connectDB();

    app.listen(config.port, () => {
      console.log(`server of saeid emon listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

main();
