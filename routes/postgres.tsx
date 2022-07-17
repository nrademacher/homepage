import { HandlerContext, Handlers } from "$fresh/server.ts";
import { connect } from "@postgres";

export const handler: Handlers = {
  async GET(_req: Request, _ctx: HandlerContext) {
    const connection = await connect();
    const title = "TEST";

    // Insert the new todo into the database
    await connection.queryObject`
          INSERT INTO todos (title) VALUES (${title})
        `;
    // Run the query
    const result = await connection.queryObject`
          SELECT * FROM todos
        `;

    // Encode the result as JSON
    const body = JSON.stringify(result.rows, null, 2);
    return new Response(body, {
      headers: { "content-type": "application/json" },
    });
  },
};
