import { createExpressServer } from "./express-server/express.server.ts";
import { oauth2Client, scopes } from "./google/google.auth.ts";

const PORT = process.env.PORT || 6969;

export const server = async () => {
  const app = createExpressServer();

  app.get("/auth", (_req, res) => {
    try {
      const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        prompt: "consent",
      });

      res.redirect(url);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  });

  app.get("/callback", async (req, res) => {
    try {
      const code = req.query.code;

      if (typeof code !== "string") {
        return res.status(400).send("Missing Code ❌");
      }

      const { tokens } = await oauth2Client.getToken(code);

      console.log({ tokens });

      res.send("Connected ✅ You can close this tab.");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  });

  app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
};
