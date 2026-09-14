<div align="center">

# 🐧 SHΞN™ Ubuntu Free Server — Cloud & Railway Edition
### سرور اوبونتوی کاملاً رایگان با دسکتاپ گرافیکی (noVNC) و ترمینال آنلاین (SSH)

<p>
  <img src="https://img.shields.io/badge/Platform-Railway%20%7C%20Docker-8A2BE2?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/OS-Ubuntu%2022.04%20LTS-E95420?style=for-the-badge&logo=ubuntu&logoColor=white" />
  <img src="https://img.shields.io/badge/Access-VNC%20%7C%20SSH-2ea44f?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Cost-100%25%20Free-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Creator-SH%CE%9EN%E2%84%A2-ff4500?style=for-the-badge" />
  <a href="https://t.me/shervini">
    <img src="https://img.shields.io/badge/Telegram-@shervini-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" />
  </a>
</p>

</div>

---

## 📖 معرفی پروژه

با این پروژه می‌توانید در کمتر از **۵ الی ۱۰ دقیقه** یک **سرور اوبونتوی کاملاً رایگان** روی پلتفرم **Railway** یا هر سرویس داکر دیگر راه‌اندازی کنید؛ این سرور دارای دسکتاپ گرافیکی سبک (XFCE4) است که مستقیماً از طریق مرورگر با **noVNC** قابل کنترل است و همچنین دسترسی کامل ترمینال (SSH) را بدون نیاز به هیچ تنظیمات پیچیده‌ای فراهم می‌سازد.

---

## ✨ ویژگی‌های کلیدی

| ویژگی | توضیح |
| :---: | :--- |
| 💸 **رایگان** | قابل اجرا روی پلن رایگان Railway یا هر سرور و سیستم با Docker |
| 🖥️ **دسکتاپ گرافیکی** | دسترسی به محیط گرافیکی روان XFCE4 از طریق مرورگر (noVNC روی پورت ۶۰۸۰) |
| 💻 **ترمینال پرسرعت** | دسترسی SSH آنلاین و اشتراک ترمینال با ابزار `sshx` |
| 🌐 **مرورگر فایرفاکس** | مرورگر Firefox رسمی از پیش نصب‌شده و بدون نیاز به Snap |
| ⚡ **راه‌اندازی فوری** | بیلد و استقرار کامل در چند دقیقه |
| 🌍 **دسترسی از همه‌جا** | بدون نیاز به نرم‌افزار جانبی، فقط با یک مرورگر وب استاندارد |

---

## 📋 پیش‌نیازها

| مورد نیاز | لینک دسترسی |
| :--- | :---: |
| حساب کاربری گیتهاب | [GitHub.com](https://github.com) |
| حساب کاربری پلتفرم Railway یا سرور دارای داکر | [Railway.app](https://railway.app) |
| مرورگر وب بروز (Chrome, Edge, Firefox) | — |

---

## 🚀 راهنمای نصب و راه‌اندازی روی Railway

<table>
<tr><th>مرحله</th><th>عملیات و راهنما</th></tr>
<tr><td><b>۱</b></td><td>این مخزن را در حساب گیتهاب خود کپی (Fork) کنید یا فایل‌های آن را داخل یک مخزن جدید آپلود نمایید.</td></tr>
<tr><td><b>۲</b></td><td>وارد سایت <a href="https://railway.app">Railway</a> شده و با اکانت گیتهاب خود وارد شوید (Sign in with GitHub).</td></tr>
<tr><td><b>۳</b></td><td>روی گزینه <b>New Project</b> کلیک کنید و سپس <b>Deploy from GitHub repo</b> را انتخاب نمایید.</td></tr>
<tr><td><b>۴</b></td><td>مخزن را انتخاب کنید تا فرآیند Build و استقرار خودکار آغاز شود.</td></tr>
<tr><td><b>۵</b></td><td>وارد تب <b>Settings</b> پروژه شوید، به بخش <b>Networking</b> بروید و گزینه <b>TCP Proxy</b> را فعال کرده و روی پورت <code>6080</code> قرار دهید.</td></tr>
<tr><td><b>۶</b></td><td>روی <b>Generate Domain</b> کلیک کنید و پورت <code>6080</code> را مشخص نمایید.</td></tr>
<tr><td><b>۷</b></td><td>دامنه‌ای که Railway به شما اختصاص داده را در مرورگر باز کنید و وارد محیط دسکتاپ گرافیکی اوبونتو شوید.</td></tr>
</table>

---

## 🐳 اجرای سریع با داکر (Local & VPS)

اگر می‌خواهید این سرور را روی سرور شخصی یا کامپیوتر خود اجرا کنید:

```bash
# کلون پروژه و ورود به پوشه
git clone <آدرس_مخزن_شما>
cd docker-ubuntu-free

# اجرا با داکر کامپوز
docker-compose up -d --build

# یا اجرای مستقیم با دستور Docker
docker build -t shen-ubuntu .
docker run -d -p 6080:6080 -p 5901:5901 --name shen-ubuntu-server shen-ubuntu
```

سپس در مرورگر خود آدرس زیر را باز کنید:
```
http://localhost:6080/vnc.html
```

---

## 🔑 فعال‌سازی ترمینال SSH آنی با sshx

پس از اتصال به محیط گرافیکی یا از طریق دسترسی به کانتینر:

**۱. نصب ابزار sshx:**
```bash
curl -sSf https://sshx.io/get | sh
```

**۲. اجرای ابزار:**
```bash
sshx
```

**۳. دسترسی به ترمینال:** لینکی که در خروجی نمایش داده می‌شود را کپی کرده و در مرورگر باز کنید تا به کنسول پرسرعت لینوکس متصل شوید.

---

## ⚠️ نکات مهم

- این کانتینر برای استفاده‌های سبک، تست ابزارها و وب‌گردی طراحی شده است.
- لینک اشتراک ترمینال `sshx` عمومی است؛ لینک آن را تنها در اختیار افراد مطمئن بگذارید.
- لطفاً شرایط استفاده و قوانین پلتفرم ارائه‌دهنده سرویس ابری را رعایت فرمایید.

---

<div align="center">

## 📣 ارتباط و پشتیبانی

برای دریافت جدیدترین آموزش‌ها، پروژه‌ها، به‌روزرسانی‌ها و ارتباط مستقیم:

<p>
  <a href="https://t.me/shervini">
    <img src="https://img.shields.io/badge/Telegram%20Channel-@shervini-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" />
  </a>
</p>

### 💬 آیدی تلگرام: [T.me/shervini](https://t.me/shervini)

---

<p>🚀 طراحی و توسعه یافته توسط <b>SHΞN™</b> برای جامعه فارسی‌زبان علاقه‌مند به لینوکس و متن‌باز</p>

</div>
