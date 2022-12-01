import faunadb from "faunadb";
FAUNA_SERVER_KEY = fnAE2tfXYFACUMUygLsQ0N5OnDt9SFExmPK95zlv;
export const serverClient = new faunadb.Client({
  secret: FAUNA_SERVER_KEY,
});
