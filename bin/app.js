#!/usr/bin/env node
require('dotenv').config();
require('../lib/db/connection').connect(process.env.MONGO_DB_URL);
require('../lib/index');
