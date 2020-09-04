const azure = require("azure-storage");
const { encrypt } = require("../utils/crypto");

const tableService = azure.createTableService();
const tableName = "linkPreviewData";

const entGen = azure.TableUtilities.entityGenerator;

module.exports = (context, req) => {
  context.log("Start ItemCreate");

  if (!req.body) {
    context.res = {
      status: 400,
      body: "Please pass an item in the request body",
    };
    context.done();
    return;
  }

  if (Array.isArray(req.body)) {
    const batch = new azure.TableBatch();

    req.body.forEach((item) => {
      const task = {
        PartitionKey: entGen.String("teban.dev"),
        RowKey: entGen.String(encrypt(item.url)),
        data: entGen.String(JSON.stringify(item)),
      };

      batch.insertOrReplaceEntity(task, { echoContent: true });
    });

    tableService.executeBatch(tableName, batch, function (
      error,
      result,
      response
    ) {
      if (!error) {
        context.res.status(201).json(response);
      } else {
        context.res.status(500).json({ error: error });
      }
    });
  } else {
    const task = {
      PartitionKey: entGen.String("teban.dev"),
      RowKey: entGen.String(encrypt(req.body.url)),
      data: entGen.String(JSON.stringify(req.body)),
    };

    // Use { echoContent: true } if you want to return the created item including the Timestamp & etag
    tableService.insertOrReplaceEntity(
      tableName,
      task,
      { echoContent: true },
      function (error, result, response) {
        if (!error) {
          context.res.status(201).json(response);
        } else {
          context.res.status(500).json({ error: error });
        }
      }
    );
  }
};
