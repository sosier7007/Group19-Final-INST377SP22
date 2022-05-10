/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';

import db from '../database/initializeDB.js';
import barkcontroller from '../controller/barkcontroller.js';
import classificationcontroller from '../controller/classificationcontroller.js';
import flowerscontroller from '../controller/flowerscontroller.js';
import foliagecontroller from '../controller/foliagecontroller.js';
import fruitscontroller from '../controller/fruitscontroller.js';
import locationcontroller from '../controller/locationcontroller.js';
import plantLocationcontroller from '../controller/plant_locationcontroller.js';
import plantscontroller from '../controller/plantscontroller.js';
import mapcontroller from '../controller/mapcontroller.js';
import plantphotocontroller from '../controller/plantphotocontroller.js';

const router = express.Router();

/* endpoint for map */
router.route('/map') // http://localhost:3000/api/map
  .get(async (req, res) => { // all entries in joined table
    try {
      const result = await db.sequelizeDB.query(mapcontroller.mapGet,
        {
          type: sequelize.QueryTypes.SELECT
        });
      console.log('data loaded');
      res.json({data: result});
    } catch (err) {
      console.log(err);
      res.json({message: 'something went wrong'});
    }
  })
  .post(async (req, res) => {
    try {
      const result = await db.sequelizeDB.query(mapcontroller.mapPost,
        {
          replacements: {
            plant_id: req.body.plant_id,
            location_code: req.body.location_code
          },
          type: sequelize.QueryTypes.INSERT
        });
      console.log('data entry added');
      res.json({data: result});
    } catch (err) {
      console.log(err);
      res.json({message: 'something went wrong'});
    }
  })
  .put(async(req, res) => { // update entry on plant_id and location_code (must be valid code)
    try {
      const result = await db.sequelizeDB.query(mapcontroller.mapPut,
        {
          replacements: {
            id: req.body.id, // original to be changed
            code: req.body.code, // original to be changed
            plant_id: req.body.plant_id, // new updated value
            location_code: req.body.location_code // new updated value
          },
          type: sequelize.QueryTypes.UPDATE
        });
      res.json({data: result});
      console.log('data updated');
    } catch (err) {
      console.log(err);
      res.json({message: 'something went wrong'});
    }
  })
  .delete(async(req, res) => { // delete on plant_id and location_code
    try {
      const result = await db.sequelizeDB.query(mapcontroller.mapDelete, {
        replacements: {
          plant_id: req.body.plant_id,
          location_code: req.body.location_code
        },
        type: sequelize.QueryTypes.DELETE
      });
      res.json(result);
      console.log('data deleted successfully');
    } catch (err) {
      console.log(err);
      res.json({message: 'something went wrong'});
    }
  });

router.route('/map/:id')
  .get(async (req, res) => { // one entry
    try {
      const {id} = req.params;
      const result = await db.sequelizeDB.query(mapcontroller.mapGet,
        {
          type: sequelize.QueryTypes.SELECT
        });
      console.log('data loaded');
      res.json({data: result[id]});
    } catch (err) {
      console.log(err);
      res.json({message: 'something went wrong'});
    }
  });

router.route('/map/:id/:code')
  .put(async(req, res) => { // update entry on plant_id and location_code (must be valid code)
    try {
      const result = await db.sequelizeDB.query(mapcontroller.mapPut,
        {
          replacements: {
            id: req.params.id, // original to be changed
            code: req.params.code, // original to be changed
            plant_id: req.body.plant_id, // new updated value
            location_code: req.body.location_code // new updated value
          },
          type: sequelize.QueryTypes.UPDATE
        });
      res.json({data: result});
      console.log('data updated');
    } catch (err) {
      console.log(err);
      res.json({message: 'something went wrong'});
    }
  });

/// // /

/* bark endpoint */
router.route('/bark')
  .get(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(barkcontroller.barkGet,
        {
          type: sequelize.QueryTypes.SELECT
        });
      console.log('This is the route');
      res.json({data: result});
    } catch (err) {
      res.json({ error: err});
    }
  })

  .put(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(barkcontroller.barkPut,
        {
          replacements: {
            bark_id: req.body.bark_id,
            plants: req.body.plant
          },
          type: sequelize.QueryTypes.UPDATE
        });
      res.json({data: result});
      console.log('Successfully Updated');
    } catch (err) {
      res.json({error: 'Server error'});
    }
  })

  .post(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(barkcontroller.barkPost,
        {
          replacements: {
            plants: req.body.plants,
            new_color: req.body.new_color,
            new_texture: req.body.new_texture,
            mature_color: req.body.mature_color,
            mature_texture: req.body.mature_texture
          },
          type: sequelize.QueryTypes.INSERT
        });
      res.json(result);
      console.log('Successfully Updated');
    } catch (err) {
      res.json({ error: 'Server error'});
    }
  })

  .delete(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(barkcontroller.barkDelete, {
        replacements: {
          bark_id: req.body.bark_id
        },
        type: sequelize.QueryTypes.DELETE
      });
      res.json(result);
      console.log('Deleted successfully');
    } catch (err) {
      res.json({error: 'Server error'});
    }
  });

/* classification endpoint */
router.route('/classification')
  .get(async (req, res) => {
    try {
      const result = await db.sequelizeDB.query(classificationcontroller.classificationGet,
        {
          type: sequelize.QueryTypes.SELECT
        });
      console.log('This is the route');
      res.json({data: result});
    } catch (err) {
      res.json({ error: err});
    }
  })
  .put(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(classificationcontroller.classificationPut,
        {
          replacements: {
            family_id: req.body.family_id,
            art: req.body.art
          },
          type: sequelize.QueryTypes.UPDATE
        });
      res.json(result);
      console.log('Successfully Updated');
    } catch (err) {
      res.json({ error: 'Server error'});
    }
  })
  .post(async (req, res) => {
    try {
      const result = await db.sequelizeDB.query(classificationcontroller.classificationPost, {
        replacements: {art: req.body.art},
        type: sequelize.QueryTypes.INSERT
      });
      res.json(result);
      console.log('Successfully Updated');
    } catch (err) {
      res.json({ error: 'Server error'});
    }
  })

  .delete(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(classificationcontroller.classificationDelete, {
        replacements: {
          family_id: req.body.family_id
        },
        type: sequelize.QueryTypes.DELETE
      });
      res.json(result);
      console.log('Deleted successfully');
    } catch (err) {
      res.json({error: 'Server error'});
    }
  });

/* flowers endpoint */
router.route('/flowers')
  .get(async (req, res) => {
    try {
      const result = await db.sequelizeDB.query(flowerscontroller.flowersGet,
        {
          type: sequelize.QueryTypes.SELECT
        });
      console.log('This is the route');
      res.json({data: result});
    } catch (err) {
      res.json({ error: err});
    }
  })
  .put(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(flowerscontroller.flowersPut,
        {
          replacements: {
            flower_id: req.body.flower_id,
            art: req.body.art
          },
          type: sequelize.QueryTypes.UPDATE
        });
      res.json(result);
      console.log('Successfully Updated');
    } catch (err) {
      res.json({ error: 'Server error'});
    }
  })

  .post(async (req, res) => {
    try {
      const result = await db.sequelizeDB.query(flowerscontroller.flowersPost, {
        replacements: {art: req.body.art},
        type: sequelize.QueryTypes.INSERT
      });
      res.json(result);
      console.log('Successfully Updated');
    } catch (err) {
      res.json({ error: 'Server error'});
    }
  })

  .delete(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(flowerscontroller.flowersDelete, {
        replacements: {
          flower_id: req.body.flower_id
        },
        type: sequelize.QueryTypes.DELETE
      });
      res.json(result);
      console.log('Deleted successfully');
    } catch (err) {
      res.json({error: 'Server error'});
    }
  });

/* foliage endpoint */
router.route('/foliage')
  .get(async (req, res) => {
    try {
      const result = await db.sequelizeDB.query(foliagecontroller.foliageGet,
        {
          type: sequelize.QueryTypes.SELECT
        });
      console.log('This is the route');
      res.json({data: result});
    } catch (err) {
      res.json({ error: err});
    }
  })
  .put(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(foliagecontroller.foliagePut,
        {
          replacements: {
            foliage_id: req.body.foliage_id,
            art: req.body.art
          },
          type: sequelize.QueryTypes.UPDATE
        });
      res.json(result);
      console.log('Successfully Updated');
    } catch (err) {
      res.json({ error: 'Server error'});
    }
  })

  .post(async (req, res) => {
    try {
      const result = await db.sequelizeDB.query(foliagecontroller.foliagePost, {
        replacements: {art: req.body.art},
        type: sequelize.QueryTypes.INSERT
      });
      res.json(result);
      console.log('Successfully Updated');
    } catch (err) {
      res.json({ error: 'Server error'});
    }
  })

  .delete(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(foliagecontroller.foliageDelete, {
        replacements: {
          foliage_id: req.body.foliage_id
        },
        type: sequelize.QueryTypes.DELETE
      });
      res.json(result);
      console.log('Deleted successfully');
    } catch (err) {
      res.json({error: 'Server error'});
    }
  });

/* fruits endpoint */
router.route('/fruits')
  .get(async (req, res) => {
    try {
      const result = await db.sequelizeDB.query(fruitscontroller.fruitsGet,
        {
          type: sequelize.QueryTypes.SELECT
        });
      console.log('This is the route');
      res.json({data: result});
    } catch (err) {
      res.json({ error: err});
    }
  })

  .put(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(fruitscontroller.fruitsPut,
        {
          replacements: {
            fruit_id: req.body.fruit_id,
            art: req.body.art
          },
          type: sequelize.QueryTypes.UPDATE
        });
      res.json(result);
      console.log('Successfully Updated');
    } catch (err) {
      res.json({ error: 'Server error'});
    }
  })

  .post(async (req, res) => {
    try {
      const result = await db.sequelizeDB.query(fruitscontroller.fruitsPost, {
        replacements: {art: req.body.art},
        type: sequelize.QueryTypes.INSERT
      });
      res.json(result);
      console.log('Successfully Updated');
    } catch (err) {
      res.json({ error: 'Server error'});
    }
  })

  .delete(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(fruitscontroller.fruitsDelete, {
        replacements: {
          fruit_id: req.body.fruit_id
        },
        type: sequelize.QueryTypes.DELETE
      });
      res.json(result);
      console.log('Deleted successfully');
    } catch (err) {
      res.json({error: 'Server error'});
    }
  });

/* location endpoint */
router.route('/location')
  .get(async (req, res) => {
    try {
      const result = await db.sequelizeDB.query(locationcontroller.locationGet,
        {
          type: sequelize.QueryTypes.SELECT
        });
      console.log('This is the route');
      res.json({data: result});
    } catch (err) {
      res.json({ error: err});
    }
  })

  .put(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(locationcontroller.locationPut,
        {
          replacements: {
            location_code: req.body.location_code,
            art: req.body.art
          },
          type: sequelize.QueryTypes.UPDATE
        });
      res.json(result);
      console.log('Successfully Updated');
    } catch (err) {
      res.json({ error: 'Server error'});
    }
  })

  .post(async (req, res) => {
    try {
      const result = await db.sequelizeDB.query(locationcontroller.locationPost, {
        replacements: {art: req.body.art},
        type: sequelize.QueryTypes.INSERT
      });
      res.json(result);
      console.log('Successfully Updated');
    } catch (err) {
      res.json({ error: 'Server error'});
    }
  })

  .delete(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(locationcontroller.locationDelete, {
        replacements: {
          location_code: req.body.location_code
        },
        type: sequelize.QueryTypes.DELETE
      });
      res.json(result);
      console.log('Deleted successfully');
    } catch (err) {
      res.json({error: 'Server error'});
    }
  });

/* plant_location */
router.route('/plant_location')
  .get(async (req, res) => {
    try {
      const result = await db.sequelizeDB.query(plantLocationcontroller.plant_locationGet,
        {
          type: sequelize.QueryTypes.SELECT
        });
      console.log('This is the route');
      res.json({data: result});
    } catch (err) {
      res.json({ error: err});
    }
  })

  .put(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(plantLocationcontroller.plant_locationPut,
        {
          replacements: {
            plant_id: req.body.plant_id,
            art: req.body.art
          },
          type: sequelize.QueryTypes.UPDATE
        });
      res.json(result);
      console.log('Successfully Updated');
    } catch (err) {
      res.json({ error: 'Server error'});
    }
  })

  .post(async (req, res) => {
    try {
      const result = await db.sequelizeDB.query(plantLocationcontroller.plant_locationPost, {
        replacements: {art: req.body.art},
        type: sequelize.QueryTypes.INSERT
      });
      res.json(result);
      console.log('Successfully Updated');
    } catch (err) {
      res.json({ error: 'Server error'});
    }
  })

  .delete(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(plantLocationcontroller.plant_locationDelete, {
        replacements: {
          plant_id: req.body.plant_id
        },
        type: sequelize.QueryTypes.DELETE
      });
      res.json(result);
      console.log('Deleted successfully');
    } catch (err) {
      res.json({error: 'Server error'});
    }
  });

/* plants endpoint */
router.route('/plants')
  .get(async (req, res) => {
    try {
      const result = await db.sequelizeDB.query(plantscontroller.plantsGet,
        {
          type: sequelize.QueryTypes.SELECT
        });
      console.log('This is the route');
      res.json({data: result});
    } catch (err) {
      res.json({ error: err});
    }
  })

  .put(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(plantscontroller.plantsPut,
        {
          replacements: {
            plant_id: req.body.plant_id,
            art: req.body.art
          },
          type: sequelize.QueryTypes.UPDATE
        });
      res.json(result);
      console.log('Successfully Updated');
    } catch (err) {
      res.json({ error: 'Server error'});
    }
  })

  .post(async (req, res) => {
    try {
      const result = await db.sequelizeDB.query(plantscontroller.plantsPost, {
        replacements: {art: req.body.art},
        type: sequelize.QueryTypes.INSERT
      });
      res.json(result);
      console.log('Successfully Updated');
    } catch (err) {
      res.json({ error: 'Server error'});
    }
  })

  .delete(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(plantscontroller.plantsDelete, {
        replacements: {
          plant_id: req.body.plant_id
        },
        type: sequelize.QueryTypes.DELETE
      });
      res.json(result);
      console.log('Deleted successfully');
    } catch (err) {
      res.json({error: 'Server error'});
    }
  });

/* Plant photo endpoint*/
router.route('/plantphotos')
.get(async(req, res) => {
  try {
    const result = await db.sequelizeDB.query(plantphotocontroller.plantPhotoGet, {
      type: sequelize.QueryTypes.SELECT
    });
    console.log('This is the route');
    res.json({data: result});
  } catch (err) {
    res.json({error: err});
  }
})

.put(async(req, res) => {
  try {
    const result = await db.sequelizeDB.query(plantphotocontroller.plantPhotoPut, {
      replacements: {
        photo_id: req.body.photo_id,
        art: req.body.art
      }, 
      type: sequelize.QueryTypes.UPDATE
    });
    res.json(result);
    console.log('Successfully Updated');
  } catch (err) {
    res.json({error: 'Server error'});
  }
})

.post(async(req, res) => {
  try {
    const result = db.sequelizeDB.query(plantphotocontroller.plantPhotoPost, {
      replacements: {art: req.body.art},
      type: sequelize.QueryTypes.INSERT
    });
    res.json(result);
    console.log('Successfully Updated');
  } catch (err) {
    res.json({error: 'Server error'});
  }
})

.delete(async(req, res) => {
  try {
    const result = db.sequelizeDB.query(plantphotocontroller.plantPhotoDelete, {
      replacements: {
        photo_id: req.body.photo_id
      }, 
      type: sequelize.QueryTypes.DELETE
    });
    res.json(result);
    console.log('Deleted successfully');
  } catch (err) {
    res.json({error: 'Server error'});
  }
});


export default router;
