// Firebase Admin SDKをインポート
const admin = require("firebase-admin");

// Firebaseプロジェクトのサービスアカウントキーのパスを指定
const serviceAccount = require("/Users/suzukikenta/Desktop/Development/Swift-Projects/Nomad-Learner-Dev-fixedLocationsUpdater/nomad-learnerdev-88484-firebase-adminsdk-w9mou-f2ec32451b.json"); // サービスアカウントキーのパス

// Firebaseを初期化（DatabaseURLを追加）
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nomad-learnerdev-88484-default-rtdb.firebaseio.com/", // DatabaseURLを指定
});

// Realtime Databaseのインスタンスを取得
const db = admin.database();

const fs = require("fs");

// fixedLocation.jsonファイルを読み込み、locationsオブジェクトを取得
const dataToUpload = JSON.parse(
  fs.readFileSync(
    "/Users/suzukikenta/Desktop/Development/Swift-Projects/Nomad-Learner-Dev-fixedLocationsUpdater/fixedLocations.json",
    "utf-8"
  )
).fixedLocations;

// データをRealtime Databaseに一括アップロードする非同期関数を定義
async function uploadData() {
  try {
    // `fixedLocations`ノードに一括でデータを設定
    await db.ref("fixedLocations").set(dataToUpload);
    console.log("すべてのデータが一括で追加されました。");
  } catch (error) {
    console.error("データの一括追加中にエラーが発生しました:", error);
  }
}

// データの追加を実行
uploadData();
