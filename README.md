# notesmasher

![demo](https://user-images.githubusercontent.com/16793732/94568014-fbf69500-02a6-11eb-9715-db421cf56008.gif)

<h2 align="center"> https://notesmasher.netlify.app</h2>

## 概要

- キーを叩き、黒いノーツを処理するまでの速度を計測できる Web アプリです。
- ノーツの細かな配置規則を設定することができます。
  - 音楽ゲームで見られるようなノーツ配置の練習を想定しています。

## 操作

- 画面下部のキーを押すと、それぞれの列に対応したノーツを処理できます。
  - このとき、青いエフェクトが発生します。
- 誤ったキーを押すと、一定時間キーが押せなくなります。
  - このとき、赤いエフェクトが発生します。
- `Esc`で最初からやり直すことができます。
  - この時、ノーツ配置はリセットされます。

## 設定

ゲーム開始前では、いくつかのキーで設定を行えます。

- `+` `-`でノーツ数を増減できます。
- `1`〜`9`の数字キーで列数を設定できます。
- `Alt`でノーツの並びがキーを左右交互で叩いて処理できるようになります。
- `<` `>`で配置の難易度を変更できます。
  - `16BIT_N`は連続した N 連打まで出現します。
  - `8BIT_N`は一つ飛ばしで連続した N 連打まで出現します。
  - `N = 1`のとき、その連打は出現しません。

## 表示情報

- 左上の`N:`が残りのノーツ数です。0 になったらクリアとなります。
- クリアすると様々な情報が見られます。
  - `TIME:`はノーツを 0 にするまでの秒数です。
  - `MISS:`は誤ったキーを押した回数です。
  - `SPEED`はノーツの秒間処理数です。
  - `BPM`は秒間処理速度を 16 分音符 BPM 換算にしたものです。
- `Screenshot`をクリックすると、スクリーンショットが保存されます。
  - 表示情報のシェアに使うことを想定しています。
