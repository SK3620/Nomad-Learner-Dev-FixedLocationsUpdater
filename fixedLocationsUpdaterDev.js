import { fixedLocations } from "./fixedLocations.js";
import admin from "firebase-admin";
import { readFileSync } from "fs";

// サービスアカウントキーのパス
const serviceAccountPath =
  "/Users/suzukikenta/Desktop/Development/Swift-Projects/Nomad-Learner-Dev-FixedLocationsUpdater/nomad-learnerdev-88484-firebase-adminsdk-w9mou-f2ec32451b.json";
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

// Firebaseを初期化（DatabaseURLを追加）
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nomad-learnerdev-88484-default-rtdb.firebaseio.com/", // DatabaseURLを指定
});

// Realtime Databaseのインスタンスを取得
const db = admin.database();

// データをRealtime Databaseに一括アップロードする非同期関数を定義
async function uploadData() {
  try {
    // `fixedLocations`ノードに一括でデータを設定
    await db.ref("fixedLocations").set(fixedLocations);
    console.log("すべてのデータが一括で追加されました。");
  } catch (error) {
    console.error("データの一括追加中にエラーが発生しました:", error);
  }
}

// データの追加を実行
uploadData();
