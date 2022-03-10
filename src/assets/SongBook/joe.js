const express = require('express');
const { UnknownError } = require('../../errors');

const router = express.Router();
const { validate } = require('express-jsonschema');
const CustomizeFactory = require('../../models/customize');

const HEADER2 = 'x-complispace-site2';
const UserConfigFactory = require('../../models/userConfig');
const restrictedAPIAccessList = require('../../../src/middleware/emailAccessList').restrictedAPIAccessList;

// Allows the end user to get the schema
router.get('/schema', (req, res) => {
  res.json(CustomizeFactory.schema);
});

const methodNotAllowed = (req, res) => {
  res.status(405).end();
};

// These methods are not allowed at this endpoint
router.options('/', methodNotAllowed);
router.put('/', methodNotAllowed);

router.get('/', (req, res, next) => {
  const groupname = req.headers[HEADER2];
  const CustomizeModel = new CustomizeFactory();
  const UserConfigModel = new UserConfigFactory();
  const customizableFields = [];

  function dataloader(i, subordinateArray) {
    if (i < subordinateArray.length) {
      const promise = CustomizeModel.all(subordinateArray[i], customizableFields);
      promise.then(() => {
        dataloader(i + 1, subordinateArray);
      }).catch(() => {
        next(new UnknownError('Customize  API failed'));
      });
    } else {
      res.status(200).json(customizableFields);
    }
  }
  UserConfigModel.get(groupname)
    .then(result => {
      if (typeof result !== 'undefined' && result.length > 0) {
        const subordinateArray = result[0].subordinates.map(item => `${groupname}.${item}`);
        dataloader(0, subordinateArray);
      } else {
        res.status('404').json('User config details not found');
      }
    })
    .catch(() => {
      next(new UnknownError('User Config API failed'));
    });
});

const ApiAccessValidator = function (req) {
  const userFound = restrictedAPIAccessList.find(item => item === req.user.emails[0].value);
  if (userFound !== undefined && userFound.length > 0) {
    return true;
  }
  return false;
};


router.post('/', validate({ body: CustomizeFactory.schema }), (req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !ApiAccessValidator(req)) {
   // if (true && !ApiAccessValidator(req)) {
    return next(new Error('Permission denied for this API'));
  }
  const CustomizeModel = new CustomizeFactory();
  CustomizeModel.create(req.body, () => res.json(200));
});

router.delete('/', (req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !ApiAccessValidator(req)) {
 //    if (true && !ApiAccessValidator(req)) {
    return next(new Error('Permission denied for this API'));
  }
  const CustomizeModel = new CustomizeFactory();
  CustomizeModel.delete(req.body, () => res.json(200));
});

module.exports = router;
