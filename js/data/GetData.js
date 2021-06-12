export class GetData {
  constructor(data) {
    this.json = data;
  }

  getAll() {
    return this.json;
  }

  getByID(id) {
    const result = this.json.filter((el) => el.id === id);
    return result;
  }

  getAllByRef(ref, value) {
    const result = this.json.filter((el) => el[`${ref}`] === value);
    return result;
  }

  getBySearch(field, value) {
    console.log(field);
    console.log(value);
    const result = this.json.filter((el) => el[`${field}`].includes(value));
    console.log(result);
    return result;
  }

  getProductsByBrand(req) {
    console.log(req);
    const result = this.json.filter(
      (el) => el.brand === req.brand && el.product === req.product
    );
    console.log(result);
    return result;
  }

  getProductByID(req) {
    const result = this.json.filter((el) => el.id === req.id);
    return result;
  }
}
