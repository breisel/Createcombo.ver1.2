function mergeImages() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const images = document.querySelectorAll('.image-container img');

  // 画像がない場合のエラーハンドリング
  if (images.length === 0) {
    alert("画像が見つかりません。");
    return;
  }

  // 各画像のサイズ（最初の画像を基準にする）
  const imageSize = images[0].naturalWidth || 50; // naturalWidthで元のサイズ取得、デフォルトは50px
  const imagesPerRow = 5; // 1行あたりの画像数
  const rows = Math.ceil(images.length / imagesPerRow);

  // キャンバスのサイズを設定
  canvas.width = imageSize * imagesPerRow;
  canvas.height = imageSize * rows;

  // 画像をキャンバスに描画
  images.forEach((img, index) => {
    const x = (index % imagesPerRow) * imageSize; // x座標
    const y = Math.floor(index / imagesPerRow) * imageSize; // y座標
    ctx.drawImage(img, x, y, imageSize, imageSize);
  });

  // 新しい画像をダウンロードするためのリンクを作成
  const link = document.createElement('a');
  link.download = 'merged_image.png'; // ファイル名
  link.href = canvas.toDataURL(); // キャンバス内容をデータURLとして取得
  document.body.appendChild(link); // 一時的にリンクを追加
  link.click(); // ダウンロードリンクをクリック
  document.body.removeChild(link); // リンクを削除
}

