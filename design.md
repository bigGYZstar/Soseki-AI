# SOSEKI AI - モバイルアプリ設計書

## 概要
夏目漱石の文体・観察眼・思索を模した対話AIアプリ。ユーザーの悩み・迷い・思考整理に対し、「引用（quote）＋文脈解説（context）＋問い返し（Socratic prompt）」で内省を促す。

---

## Screen List（画面一覧）

### 1. Onboarding（オンボーディング）
- 3枚のスライド形式で使い方を説明
- 免責事項の表示
- 「始める」ボタンでチャット画面へ遷移

### 2. Chat（チャット）- メイン画面
- 入力欄と送信ボタン
- メッセージリスト（ユーザー・AI）
- 引用カード（作品名、章/段落、引用文）
- 出典表示（青空文庫等）
- 英語併記表示（設定でON/OFF）
- 「別の一節を」ボタン
- 「もう少し掘る」ボタン

### 3. Settings（設定）
- 英語併記ON/OFF
- ローカルのみ/クラウド許可（モック）
- データ削除
- 免責事項の再表示
- アプリについて

---

## Primary Content and Functionality（主要コンテンツと機能）

### チャット画面
- **メッセージバブル**: ユーザーは右側（アクセントカラー）、AIは左側（サブカラー）
- **引用カード**: 
  - 引用文（縦書き風の装飾）
  - 作品名・章/段落
  - 出典リンク
- **AI応答構造**:
  1. 引用（1〜3短文）
  2. 文脈説明（なぜその引用か）
  3. 漱石AIの所感（短い）
  4. 問い返し（1つ）
- **アクションボタン**: 「別の一節を」「もう少し掘る」

### 設定画面
- トグルスイッチ形式の設定項目
- セクション分けされたリスト表示

---

## Key User Flows（主要ユーザーフロー）

### 初回起動フロー
1. アプリ起動 → オンボーディング画面
2. スライド3枚を閲覧（スワイプまたはボタン）
3. 免責事項を確認
4. 「始める」タップ → チャット画面へ

### 相談フロー
1. チャット画面で悩みを入力
2. 送信ボタンをタップ
3. AI応答を受信（引用カード＋解説＋問い返し）
4. 「別の一節を」で別の引用を取得
5. 「もう少し掘る」で深掘り

### 設定変更フロー
1. タブバーから設定画面へ
2. 英語併記をON/OFF
3. チャット画面に戻ると設定が反映

---

## Color Choices（カラー選定）

### ブランドカラー
- **Primary（墨色）**: `#2C2C2C` - 漱石の知的で落ち着いた印象
- **Accent（藍色）**: `#1E4D6B` - 日本の伝統色、信頼感
- **Secondary（和紙色）**: `#F5F1E8` - 温かみのある背景

### Light Mode
- Background: `#FAFAF7` - 和紙のような柔らかい白
- Surface: `#FFFFFF` - カード背景
- Text Primary: `#2C2C2C` - 墨色
- Text Secondary: `#6B6B6B` - グレー
- Accent: `#1E4D6B` - 藍色

### Dark Mode
- Background: `#1A1A1A` - 深い黒
- Surface: `#2C2C2C` - カード背景
- Text Primary: `#F5F1E8` - 和紙色
- Text Secondary: `#A0A0A0` - グレー
- Accent: `#4A8DB7` - 明るい藍色

### 引用カード専用
- Quote Background: `#F0EBE0` (Light) / `#3A3A3A` (Dark)
- Quote Border: `#D4C9B8` (Light) / `#4A4A4A` (Dark)
- Quote Text: `#4A4A4A` (Light) / `#E0E0E0` (Dark)

---

## Typography（タイポグラフィ）

### フォントサイズ
- Title: 28pt (lineHeight: 36pt)
- Subtitle: 20pt (lineHeight: 28pt)
- Body: 16pt (lineHeight: 24pt)
- Caption: 14pt (lineHeight: 20pt)
- Small: 12pt (lineHeight: 16pt)

### フォントウェイト
- Title: Bold (700)
- Subtitle: SemiBold (600)
- Body: Regular (400)
- Emphasis: SemiBold (600)

---

## Spacing & Layout（スペーシング）

### 基本グリッド
- Base unit: 8pt
- Screen padding: 16pt
- Card padding: 16pt
- Section gap: 24pt
- Item gap: 12pt

### タッチターゲット
- 最小サイズ: 44pt × 44pt
- ボタン高さ: 48pt
- 入力欄高さ: 48pt

### Corner Radius
- Buttons: 12pt
- Cards: 16pt
- Input fields: 12pt
- Message bubbles: 16pt

---

## Navigation（ナビゲーション）

### タブバー構成
1. **チャット** (chat.bubble.fill) - メイン画面
2. **設定** (gearshape.fill) - 設定画面

### アイコンサイズ
- Tab bar icons: 24pt
- Action buttons: 20pt

---

## Components（コンポーネント）

### QuoteCard（引用カード）
- 引用文（明朝体風、やや大きめ）
- 作品名・章情報
- 出典リンク
- 背景は和紙風の色

### MessageBubble（メッセージバブル）
- ユーザー: 右寄せ、アクセントカラー背景
- AI: 左寄せ、サブカラー背景

### ActionButton（アクションボタン）
- 「別の一節を」「もう少し掘る」
- アウトラインスタイル

### SettingRow（設定行）
- ラベル + トグル/値
- タップ可能な行

---

## Accessibility（アクセシビリティ）

- 最小フォントサイズ: 14pt
- コントラスト比: 4.5:1以上
- タッチターゲット: 44pt以上
- スクリーンリーダー対応のラベル
