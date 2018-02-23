LIVEJOURNAL
ГЛАВНАЯ
РЕЙТИНГ ЗАПИСЕЙ

ВОЙТИ
СОЗДАТЬ БЛОГ
РУССКИЙ (RU)
UZVERSS
ПОДПИСАТЬСЯ
В СТИЛЕ ЖЖ
Установка Node.js с помощью NVM - uzverss
> Свежие записи
> Архив
> Друзья
> Личная информация


Апрель 12, 2016

Previous Entry  Поделиться  Next Entry
08:17 pm - Установка Node.js с помощью NVM



развернуть

https://nodejs.org

Для начала нужно получить из репозитория Ubuntu программы, которые позволят построить пакеты с исходными кодами. Nvm будет использовать эти инструменты для сборки необходимых компонентов:

sudo apt-get update

sudo apt-get install build-essential libssl-dev
Когда необходимые пакеты установлены, можно извлечь установочный скрипт nvm со страницы GitHub. Номер версии может отличаться, но в целом его можно загрузить и установить с помощью следующего синтаксиса:


curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash


Это скачает скрипт и запустит его. Программа будет установлена в подкаталог домашнего каталога в ~/.nvm; кроме того, в файл ~/.profile будут внесены необходимые строки.


Чтобы получить доступ к функциям nvm, нужно выйти из системы и войти снова, или же запустить команду source на файл ~/.profile, чтобы сообщить текущей сессии о внесенных изменениях.


source ~/.profile


Теперь, когда nvm установлен, можно перейти к установке изолированных версий Node.js.


Чтобы узнать, какие версии Node.js доступны, наберите:


nvm ls-remote

. . .

v0.11.6

v0.11.7

v0.11.8

v0.11.9

v0.11.10

v0.11.11

v0.11.12

v0.11.13


Как видите, на данный момент последняя доступная версия — 0.11.13. Ее можно установить, набрав:


nvm install 8.9.4


Обычно nvm переключается на последнюю установленную версию. Чтобы переключить nvm на только что загруженную версию, наберите:


nvm use 8.9.4


При установке Node.js с помощью nvm исполнительный файл называется node. Чтобы узнать, какая версия используется в данный момент, введите:


node -v

v.0.11.13


При наличии нескольких версий Node.js можно просмотреть, какие версии установлены:


nvm ls


Чтобы сделать одну из версий версией по умолчанию, введите:


nvm alias default 8.9.4


Данная версия будет автоматически запущена в каждой новой сессии. На нее можно сослаться по псевдониму:


nvm use default


Каждая версия Node.js будет отслеживать свои пакеты и давать npm возможность управлять ними.


npm может установить пакеты в каталог проекта Node.js  (./node_modules) с помощью обычного формата:


npm install express


Чтобы установить Node.js глобально (т.е., доступно для других проектов, которые используют эту версию Node.js), внесите флаг -g:


npm install -g express


Это установит пакеты в


~/.nvm/node_version/lib/node_modules/package_name


Глобальная установка Node.js позволяет запускать команды из командной строки, но при этом нужно использовать link, чтобы запросить пакет из программы:


npm link express


деактивировать nvm (если нужно удалить nodejs и тд.)


nvm deactivate


Чтобы узнать о доступных опциях nvm больше, наберите:


nvm help


Список полезных команд npm - пакетного менеджера Node.js

Важно: Пакеты с ключем -g и без него это разные пакеты. Ключ -g относится к глобально установленному пакету.


Список установленных пакетов

npm list -g --depth=0


Обновить пакет

npm install bower -g


Удалить пакет

npm uninstall bower -g


Список пакетов, требующих обновления

npm outdated -g --depth=0


Версия пакета (установленная)

npm list bower -g


Версия пакета (последняя)

npm view bower version


Список всех версий пакета

npm view bower versions


Установить определенную версию пакета

npm install bower@1.5.0 -g


обновление

npm install nvm -g
npm install npm -g
npm -v
nvm --version
nvm deactivate
nvm alias default 6.0.0 (версию node)
npm uninstall 6.0.0 (версию node)

Настройка работы npm через proxy

# настройка proxy 
user@host:~$ npm config set proxy http://domain%5Cusername:password@proxy.domain.org:3128

# отключение ssl 
user@host:~$ npm config set strict-ssl false

или

echo proxy http://domain%5Cusername:password@proxy.domain.org:3128 > .npmrc
echo strict-ssl false >> .npmrc
полезные пакеты

npm install python-shell

-------------------------------------------------------------
если после установки будет тормозить запуск терминала, то нужно закоментировать в .bashrc строки

export NVM_DIR="/home/пользователь/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

и снимать коментарий только когда нужна node

http://www.8host.com/blog/ustanovka-node-js-na-ubuntu-14-04/
https://www.digitalocean.com/community/tutorials/node-js-ubuntu-14-04-ru
http://ru.stackoverflow.com/questions/490098/npm-через-proxy-сервер
https://torwald88.wordpress.com/2015/10/26/настройка-работы-npm-через-proxy/
http://www.unix-lab.org/posts/node-nvm/
https://habrahabr.ru/post/206678/
https://habrahabr.ru/post/133363/
https://github.com/creationix/nvm
https://www.npmjs.com/search?q=python
http://uzverss.livejournal.com/51536.html
http://uzverss.livejournal.com/tag/nodejs

Tags: javascript, nodejs, npm, www
(Оставить комментарий)


> Go to Top
LiveJournal.com
SHAKKO_KITSUNE Балет про казаков в Париже
Случайный блог



apt-get update
apt-get install nodejs
apt-get install npm
sudo apt-get remove nodejs

sudo apt-get remove npm

sudo apt-get purge nodejs
it is only removing node related packages i.e. relevant packages, nothing more.

On the other hand, when you do:

sudo apt-get purge --auto-remove nodejs
it is necessarily doing:

sudo apt-get purge nodejs
sudo apt-get autoremove
and the removal of the gyp, linux-headers-4.4.0-18-generic etc packages are actually triggered by autoremove as they were installed as dependencies and no longer needed by any installed package, presumably because the main package has been removed.

So it is perfectly fine in this context to run:

sudo apt-get purge --auto-remove nodejs
If you are too paranoid, you can do it in two steps: first purge nodejs:

sudo apt-get purge nodejs
and then remove the orphan dependencies (till now, if any):

sudo apt-get autoremove

curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs

npm rebuild