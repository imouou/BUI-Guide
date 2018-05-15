# FAQ 常见问题


## 请求跨域

打开可以跨域的谷歌;
    
* **49以下版本解决跨域问题**
  **mac**
  ```
  $ open -a Google\ Chrome --args --disable-web-security
  ```
  **windows**
  ```
  "C:\Program Files\Google\Chrome\Application\chrome.exe" --args --disable-web-security 
  ```

* **49以上版本解决跨域问题**
  **mac**
  ```
  $ open -a Google\ Chrome --args --disable-web-security  --user-data-dir
  ```
  **windows**
  ```
  "C:\Program Files\Google\Chrome\Application\chrome.exe" --args --disable-web-security  --user-data-dir
  ```

如果以上方式不能解决你的跨域问题,请自行网上搜索 chrome对应的版本的跨域.

