import {
  service_getAllPaintings,
  service_getPaintingById,
  service_getDocsToUse,
  service_addPainting,
  service_updatePainting,
  service_deletePainting,
  service_getDatabaseTemplate,
} from "../service_section/service.js";

// GET docs manual
async function controller_getDocsToUse(req, res) {
  try {
    const manual = await service_getDocsToUse();
    return res.status(200).json(manual);
  } catch (error) {
    if (error.message === "Manual docs not found") {
      return res.status(404).json({message: error.message});
    }
    return res.status(500).json({ message: error.message });
  }
}

// GET data template untuk painting
async function controller_getDatabaseTemplate(req, res) {
  try {
    const template_data = await service_getDatabaseTemplate();
    return res.status(200).json(template_data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// GET semua data painting
async function controller_getAllPaintings(req, res) {
  try {
    const all_paintings = await service_getAllPaintings(req.query);

    if (all_paintings.length === 0) {
      return res.status(404).json({ message: "No paintings found" });
    }
    return res.status(200).json(all_paintings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// GET satu data painting
async function controller_getPaintingById(req, res) {
  try {
    const painting_id = Number(req.params.id);
    const targeted_painting = await service_getPaintingById(painting_id);
    return res.status(200).json(targeted_painting);
  } catch (error) {
    if (error.message === "Painting not found") {
      return res.status(404).json({ message: error.message });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
}

// POST satu data painting :body
async function controller_addPainting(req, res) {
  let new_painting_data = req.body;

  // cek data yang diinputkan client
  const template = await service_getDatabaseTemplate();
  const array_template_key = Object.keys(template).filter(
    (key) => key !== "id",
  );

  // pengendalian value 0
  if (
    Number(new_painting_data.year) === 0 ||
    Number(new_painting_data.estimated_price_million_usd) === 0
  ) {
    return res
      .status(400)
      .json({ message: "Year and Estimated Price value cannot be 0" });
  }

  // cek apakah key yang dibutuhkan sudah ada
  let missing_data = [];
  array_template_key.forEach((key) => {
    if (!(key in new_painting_data) || !new_painting_data[key]) {
      missing_data.push(key);
      return;
    }
  });

  if (missing_data.length > 0) {
    return res
      .status(400)
      .json({ message: `Some data are missing`, missing: missing_data });
  }

  // cek apakah painting sudah ada
  const all_paintings = await service_getAllPaintings(); // {}
  const check_exist = all_paintings.find(
    (painting) =>
      painting.title.toLowerCase() === new_painting_data.title.toLowerCase(),
  );

  if (check_exist) {
    return res.status(409).json({
      message: "A painting with the same title has already registered",
      existing_id: check_exist.id,
    });
  }

  // masukkan painting baru
  try {
    let added_painting = await service_addPainting(new_painting_data);
    return res.status(201).json(added_painting);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// DELETE satu data painting :id
async function controller_deletePainting(req, res) {
  try {
    const painting_id = Number(req.params.id);
    const deleted_painting = await service_deletePainting(painting_id);
    return res.status(200).json(deleted_painting);
  } catch (error) {
    if (error.message === "Painting not found") {
      return res.status(404).json({ message: error.message });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
}

// PUT satu data painting :id + body(tanpa id)
async function controller_updatePainting(req, res) {
  const painting_id = Number(req.params.id);

  // handle error keys
  let false_data = [];
  const template = await service_getDatabaseTemplate();
  const array_template_key = Object.keys(template).filter(
    (key) => key !== "id",
  );

  Object.entries(req.body).forEach(([key, value]) => {
    if (
      !array_template_key.includes(key) ||
      typeof value !== typeof template[key]
    ) {
      false_data.push(key);
    }
  });

  if (false_data.length > 0) {
    return res
      .status(400)
      .json({ message: `Invalid data`, invalid_data: false_data });
  }

  const { id, ...actual_data } = req.body;
  const new_painting_data = actual_data;
  try {
    const updatedPainting = await service_updatePainting(
      painting_id,
      new_painting_data,
    );
    return res.status(200).json(updatedPainting);
  } catch (error) {
    if (error.message === "Painting not found") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
}

export {
  controller_addPainting,
  controller_getAllPaintings,
  controller_getPaintingById,
  controller_getDatabaseTemplate,
  controller_getDocsToUse,
  controller_updatePainting,
  controller_deletePainting
};
