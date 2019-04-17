# WakeUpCustomize

cybozu developer network記事のプログラムです。

## How to install

以下のコマンドを実行してモジュールをインストールしてください。 <br/>

```console
$ npm install
```

## How to use

使い方を軽く紹介します。

### AWS deploy

[Serverless Framework](https://serverless.com/) を利用します。 <br/>

```console
$ sls deploy -v
```

これだけでAWS環境にデプロイできます。

### Edit config file

設定を変更する場合は `serverless.yml` を修正してください。

### Deploy only function

`sls deploy -v` だとAWS環境を再構築するため、関数だけ更新する場合は以下のコマンドが良いです。

```console
$ sls deploy -f {func name}
```

### logs

ログの確認は以下のコマンドで行います

```console
$ sls logs -f {func name}
```

`| tail` とかすると良いかも。