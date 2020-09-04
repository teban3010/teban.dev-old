const azure = require("azure-storage");

const tableService = azure.createTableService();
const tableName = "linkPreviewData";
const { encrypt } = require("../utils/crypto");

module.exports = (context, req) => {
  context.log("Start ItemRead");

  const id = encrypt(req.query.url);
  if (id) {
    // return item with RowKey 'id'
    tableService.retrieveEntity(tableName, "teban.dev", id, function (
      error,
      result,
      response
    ) {
      if (!error) {
        const data = {...response.body, data: JSON.parse(response.body.data)}
        context.res.status(200).json(data);
      } else {
        context.res.status(500).json({ error: error });
      }
    });
  } else {
    // return the top x items
    var query = new azure.TableQuery().top(100);
    tableService.queryEntities(tableName, query, null, function (
      error,
      result,
      response
    ) {
      if (!error) {
        context.res.status(200).json(response.body.value);
      } else {
        context.res.status(500).json({ error: error });
      }
    });
  }
};
