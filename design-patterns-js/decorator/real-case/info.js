//component
class ClientComponent {
  constructor(url) {
    this.url = url;
  }

  async getData() {
    const res = await fetch(this.url);
    const data = await res.json();
    return data;
  }
}

//decorator
class ClientDecorator {
  constructor(clientComponent) {
    this.clientComponent = clientComponent;
  }

  async getData() {
    return await this.clientComponent.getData();
  }
}

//decorator 1
class UpperCaseTitleClientDecorator extends ClientDecorator {
  async getData() {
    const data = await super.getData();
    const newData = data.map((item) => {
      item.title = item.title.toUpperCase();
      return item;
    });
    return newData;
  }
}

//decorator 2
class HtmlClientDecorator extends ClientDecorator {
  async getData() {
    const data = await super.getData();
    const newData = data.map((item) => {
      item.title = `<h1>${item.title}</h1>`;
      item.thumbnailUrl = `<img src='${item.thumbnailUrl}'>`;
      return item;
    });
    return newData;
  }
}

(async () => {
  const url = "https://jsonplaceholder.typicode.com/photos";
  const client = new ClientComponent(url);
  const data = await client.getData();
  console.log("data", data);

  const upperClient = new UpperCaseTitleClientDecorator(client);
  const upperData = await upperClient.getData();
  console.log("uppercase title data: ", upperData);

  const htmlUpperClient = new HtmlClientDecorator(upperClient);
  const htmlUpperData = await htmlUpperClient.getData();
  console.log("html uppercase title data: ", htmlUpperData);
  divContent1.innerHTML = htmlUpperData.reduce((ac, e) => {
    return ac + e.title + e.thumbnailUrl;
  }, "");

  const htmlClient = new HtmlClientDecorator(client);
  const htmlData = await htmlClient.getData();
  console.log("html data: ", htmlData);
  divContent2.innerHTML = htmlData.reduce((ac, e) => {
    return ac + e.title + e.thumbnailUrl;
  }, "");
})();
