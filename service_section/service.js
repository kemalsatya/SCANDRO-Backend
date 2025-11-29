import data_lukisan from "../database_section/data.js";
import docs from "../database_section/docs.js";
let database = data_lukisan;

// == CREATE ==
async function service_addPainting(painting_data) {
  let new_id = database.length === 0 ? 1 : database[database.length - 1].id + 1;

  const new_painting = {
    id: new_id,
    ...painting_data,
  };

  database.push(new_painting);
  return new_painting;
}

// == READ ==
async function service_getDatabaseTemplate() {
  let template = {
    id: 123,
    title: "string",
    artist: "string",
    year: 1000,
    style: "string",
    location: "string",
    description: "string",
    price: 1000,
    country: "string",
  };
  return template;
}

async function service_getDocsToUse() {
  let manual = docs;
  if(!manual) throw new Error("Manual docs not found");
  return manual;
}

async function service_getAllPaintings(filters = {}) {
  if (!filters || Object.keys(filters).length === 0) {
    return database;
  }

  let result = database;
  Object.keys(filters).forEach((key) => {
    const filter_value = filters[key]; // value dari user

    if (key.endsWith("_min")) {
      const real_key = key.replace("_min", "");
      result = result.filter(
        (painting) => painting[real_key] >= Number(filter_value),
      );
      return;
    }

    // Handle range: year_to
    if (key.endsWith("_max")) {
      const real_key = key.replace("_max", "");
      result = result.filter(
        (painting) => painting[real_key] <= Number(filter_value),
      );
      return;
    }

    // Handle string atau number
    result = result.filter((painting) => {
      const field_value = painting[key];

      if (typeof field_value === "string") {
        return field_value
          .toLowerCase()
          .includes(String(filter_value).toLowerCase());
      }

      if (typeof field_value === "number") {
        return field_value === Number(filter_value);
      }

      // untuk pengecekan dengan tipe data lain
      return true;
    });
  });

  return result;
}

async function service_getPaintingById(id) {
  const targeted_painting = database.find(
    (painting) => painting.id === Number(id),
  );
  if (!targeted_painting) {
    throw new Error("Painting not found");
  }
  return targeted_painting;
}

//== UPDATE ==
async function service_updatePainting(painting_id, new_painting_data) {
  // id : req.params.id;, painting_data : req.body => {object key value}

  const target_index = database.findIndex(
    (painting) => painting.id === Number(painting_id),
  );

  if (target_index === -1) {
    throw new Error("Painting not found");
  }

  let target_painting = database[target_index];

  // update data painting
  Object.assign(target_painting, new_painting_data);

  // kembalikan
  return target_painting;
}

//== DELETE ==
async function service_deletePainting(id) {
  const target_index = database.findIndex(
    (painting) => painting.id === Number(id),
  );
  if (target_index == -1) {
    throw new Error("Painting not found");
  }
  let deleted_painting = database.splice(target_index, 1);
  return deleted_painting[0];
}

export {
  service_getDatabaseTemplate,
  service_getAllPaintings,
  service_getPaintingById,
  service_getDocsToUse,
  service_addPainting,
  service_updatePainting,
  service_deletePainting,
};
