"use strict";
import dotenv from "dotenv";

dotenv.config();

export const HOST = process.env.HOST || "localhost";
export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || 5432;
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "";
export const SEED_DB = process.env.SEED_DB === "true";
export const DB_USERNAME = process.env.DB_USERNAME || "temp_user";
export const PASSWORD = process.env.DB_PASSWORD || "temp_password";
export const DATABASE = process.env.DATABASE || "temp_db";
export const JWT_SECRET = process.env.JWT_SECRET || "temp_secret";
export const cookieKey = process.env.COOKIE_KEY || "temp_cookie";
export const LOGIN_RATE_LIMIT_VENTANA_MS = parseInt(process.env.LOGIN_RATE_LIMIT_VENTANA_MS || String(15 * 60 * 1000), 10);
export const LOGIN_RATE_LIMIT_MAXIMO = parseInt(process.env.LOGIN_RATE_LIMIT_MAXIMO || "5", 10);