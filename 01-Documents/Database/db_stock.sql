-- *********************************************
-- * SQL SQLite generation                     
-- *--------------------------------------------
-- * DB-MAIN version: 11.0.2              
-- * Generator date: Sep 14 2021              
-- * Generation date: Wed May 22 20:02:37 2024 
-- * LUN file: E:\Development\01-Github\Repositories\projects\P-TPI-ETML\01-Documents\Database\db_stock.lun 
-- * Schema: MLD/3 
-- ********************************************* 


-- Database Section
-- ________________ 


-- Tables Section
-- _____________ 

create table article (
     id_article varchar(255) not null,
     description varchar(128) not null,
     brand varchar(50) not null,
     collection varchar(50) not null,
     size varchar(10) not null,
     color varchar(20) not null,
     constraint ID_article primary key (id_article));

create table order (
     id_order varchar(255) not null,
     units numeric(50) not null,
     fk_user varchar(255) not null,
     fk_shop varchar(255) not null,
     fk_article varchar(255) not null,
     constraint ID_order primary key (id_order),
     foreign key (fk_user) references user,
     foreign key (fk_shop) references shop,
     foreign key (fk_article) references article);

create table shop (
     id_shop varchar(255) not null,
     name varchar(255) not null,
     city varchar(255) not null,
     constraint ID_shop primary key (id_shop));

create table user (
     id_user varchar(255) not null,
     name varchar(255) not null,
     email varchar(255) not null,
     password varchar(255) not null,
     isBoss char not null,
     fk_shop varchar(255),
     constraint ID_user primary key (id_user),
     foreign key (fk_shop) references shop);

create table shop_article (
     id_article varchar(255) not null,
     id_shop varchar(255) not null,
     unitsStored numeric(10) not null,
     unitsSolded numeric(10) not null,
     constraint ID_shop_article primary key (id_article, id_shop),
     foreign key (id_shop) references shop,
     foreign key (id_article) references article);


-- Index Section
-- _____________ 

create unique index ID_article
     on article (id_article);

create unique index ID_order
     on order (id_order);

create index FKorder
     on order (fk_user);

create index FKhave
     on order (fk_shop);

create index FKcontains
     on order (fk_article);

create unique index ID_shop
     on shop (id_shop);

create unique index ID_user
     on user (id_user);

create index FKisManager
     on user (fk_shop);

create unique index ID_shop_article
     on shop_article (id_article, id_shop);

create index FKsho_sho
     on shop_article (id_shop);

