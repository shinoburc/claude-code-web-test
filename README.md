# Next.js クレジットカード支払いアプリ

Next.js 14とStripeを使用した、安全で使いやすいクレジットカード決済システムです。

## 機能

- ユーザー認証（NextAuth.js）
- クレジットカード決済（Stripe）
- 支払い履歴の管理
- レスポンシブデザイン
- TypeScriptによる型安全な開発

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **データベース**: SQLite (Prisma ORM)
- **認証**: NextAuth.js
- **決済**: Stripe
- **UI**: React, Stripe Elements

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example`を`.env`にコピーして、必要な環境変数を設定します：

```bash
cp .env.example .env
```

以下の環境変数を設定してください：

- `DATABASE_URL`: データベース接続URL（デフォルトはSQLite）
- `NEXTAUTH_URL`: アプリケーションのURL（開発環境では`http://localhost:3000`）
- `NEXTAUTH_SECRET`: NextAuth.jsのシークレットキー（ランダムな文字列を生成）
- `STRIPE_SECRET_KEY`: StripeのシークレットAPI キー
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripeの公開可能APIキー

### 3. Stripeの設定

1. [Stripe](https://stripe.com/)にアカウントを作成
2. ダッシュボードからAPIキーを取得
3. テストモードのキーを`.env`に設定

### 4. データベースのセットアップ

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

アプリケーションは [http://localhost:3000](http://localhost:3000) で起動します。

## 使い方

### 1. ユーザー登録

1. トップページから「新規登録」をクリック
2. 名前、メールアドレス、パスワードを入力
3. 「登録」ボタンをクリック

### 2. ログイン

1. 「ログイン」をクリック
2. メールアドレスとパスワードを入力
3. 「ログイン」ボタンをクリック

### 3. 支払い

1. ログイン後、「支払いを開始」をクリック
2. 金額と説明を入力
3. 「支払いフォームを表示」をクリック
4. クレジットカード情報を入力
5. 「支払う」ボタンをクリック

### 4. 支払い履歴の確認

1. 「支払い履歴」をクリック
2. 過去の支払い記録を確認できます

## プロジェクト構造

```
.
├── prisma/
│   └── schema.prisma          # Prismaスキーマ定義
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/         # NextAuth.js設定
│   │   │   └── payment/      # 支払いAPIエンドポイント
│   │   ├── auth/             # 認証ページ
│   │   ├── payment/          # 支払いページ
│   │   ├── layout.tsx        # ルートレイアウト
│   │   ├── page.tsx          # ホームページ
│   │   └── globals.css       # グローバルCSS
│   ├── components/
│   │   └── PaymentForm.tsx   # 支払いフォームコンポーネント
│   ├── lib/
│   │   ├── prisma.ts         # Prismaクライアント
│   │   └── stripe.ts         # Stripe設定
│   └── types/
│       └── next-auth.d.ts    # NextAuth型定義
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## APIエンドポイント

### 認証

- `POST /api/auth/signup` - ユーザー登録
- `POST /api/auth/signin` - ログイン
- `POST /api/auth/signout` - ログアウト

### 支払い

- `POST /api/payment/create-intent` - PaymentIntent作成
- `POST /api/payment/confirm` - 支払い確認
- `GET /api/payment/history` - 支払い履歴取得

## セキュリティに関する注意

このデモアプリケーションは教育目的で作成されています。本番環境で使用する場合は、以下の点に注意してください：

1. **パスワードのハッシュ化**: 現在はパスワードを平文で保存していますが、本番環境では必ず`bcrypt`などでハッシュ化してください
2. **環境変数の管理**: `.env`ファイルは絶対にGitにコミットしないでください
3. **HTTPS**: 本番環境では必ずHTTPSを使用してください
4. **Stripeキー**: テストキーと本番キーを適切に管理してください
5. **CSRFプロテクション**: NextAuth.jsが提供するCSRF保護を有効にしてください

## データベース

デフォルトではSQLiteを使用していますが、本番環境ではPostgreSQLやMySQLの使用を推奨します。

Prismaスキーマの`datasource`セクションを変更することで、他のデータベースに切り替えることができます。

## テスト用クレジットカード情報

Stripeのテストモードでは、以下のテストカード番号を使用できます：

- カード番号: `4242 4242 4242 4242`
- 有効期限: 未来の任意の日付
- CVC: 任意の3桁の数字
- 郵便番号: 任意の番号

## ライセンス

MIT

## サポート

問題が発生した場合は、GitHubのIssuesで報告してください。
