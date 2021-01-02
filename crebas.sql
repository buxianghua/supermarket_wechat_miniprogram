
create table Relationship_10 (
   product_id           varchar(1)           not null,
   product_name         varchar(1)           not null,
   user_id              varchar(1)           not null,
   user_name            varchar(1)           not null,
   user_description     varchar(1)           not null,
   constraint PK_RELATIONSHIP_10 primary key (product_id, product_name, user_id, user_name, user_description)
)

create index Relationship_14_FK on Relationship_10 (
product_id ASC,
product_name ASC
)

create index Relationship_15_FK on Relationship_10 (
user_id ASC,
user_name ASC,
user_description ASC
)

create table Relationship_11 (
   order_id             varchar(1)           not null,
   product_id           varchar(1)           not null,
   product_name         varchar(1)           not null,
   constraint PK_RELATIONSHIP_11 primary key (order_id, product_id, product_name)
)


create index Relationship_16_FK on Relationship_11 (
order_id ASC
)

/*==============================================================*/
create index Relationship_17_FK on Relationship_11 (
product_id ASC,
product_name ASC
)


create table Relationship_13 (
   product_id           varchar(1)           not null,
   product_name         varchar(1)           not null,
   show_id              varchar(1)           not null,
   show_name            varchar(1)           not null,
   show_img             image                not null,
   constraint PK_RELATIONSHIP_13 primary key (product_id, product_name, show_id, show_name, show_img)
)


create index Relationship_20_FK on Relationship_13 (
product_id ASC,
product_name ASC
)


create index Relationship_21_FK on Relationship_13 (
show_id ASC,
show_name ASC,
show_img ASC
)

create table Relationship_3 (
   order_id             varchar(1)           not null,
   user_id              varchar(1)           not null,
   user_name            varchar(1)           not null,
   user_description     varchar(1)           not null,
   constraint PK_RELATIONSHIP_3 primary key (order_id, user_id, user_name, user_description)
)


create index Relationship_3_FK on Relationship_3 (
order_id ASC
)

create index Relationship_4_FK on Relationship_3 (
user_id ASC,
user_name ASC,
user_description ASC
)

create table Relationship_4 (
   cate_id              varchar(1)           not null,
   thematic_id          varchar(1)           not null,
   thematic_name        varchar(1)           not null,
   constraint PK_RELATIONSHIP_4 primary key (cate_id, thematic_id, thematic_name)
)

create index Relationship_5_FK on Relationship_4 (
cate_id ASC
)


create index Relationship_6_FK on Relationship_4 (
thematic_id ASC,
thematic_name ASC
)

create table Relationship_6 (
   collection_id        varchar(1)           not null,
   collection_price     float                not null,
   user_id              varchar(1)           not null,
   user_name            varchar(1)           not null,
   user_description     varchar(1)           not null,
   constraint PK_RELATIONSHIP_6 primary key (collection_id, collection_price, user_id, user_name, user_description)
)


create index Relationship_9_FK on Relationship_6 (
user_id ASC,
user_name ASC,
user_description ASC
)

create table Relationship_9 (
   cart_id              varchar(1)           not null,
   cart_name            varchar(1)           not null,
   cart_number          float                not null,
   cart_sum             char(10)             not null,
   cart_img             varchar(1)           not null,
   cart_status          bit                  not null,
   user_id              varchar(1)           not null,
   user_name            varchar(1)           not null,
   user_description     varchar(1)           not null,
   constraint PK_RELATIONSHIP_9 primary key (cart_id, cart_name, cart_number, cart_sum, cart_img, cart_status, user_id, user_name, user_description)
)


create index Relationship_12_FK on Relationship_9 (
cart_id ASC,
cart_name ASC,
cart_number ASC,
cart_sum ASC,
cart_img ASC,
cart_status ASC
)

create index Relationship_13_FK on Relationship_9 (
user_id ASC,
user_name ASC,
user_description ASC
)


create table banner (
   banner_id            varchar(1)           not null,
   banner_name          varchar(1)           not null,
   banner_description   text                 null,
   banner_image         image                null,
   banner_product_id    varchar(1)           not null,
   banner_updata_time   datetime             not null,
   constraint PK_BANNER primary key nonclustered (banner_id, banner_product_id, banner_updata_time)
)

create table cateries (
   cate_id              varchar(1)           not null,
   Cate_name            varchar(1)           not null,
   Cate_type            int                  not null,
   Cate_time            datetime             not null,
   Cate_update_time     datetime             not null,
   constraint PK_CATERIES primary key nonclustered (cate_id)
)


create table detailedclassification (
   detailed_id          varchar(1)           not null,
   detailed_name        varchar(1)           not null,
   thematic_id          varchar(1)           null,
   thematic_name        varchar(1)           null,
   detailed_description varchar(1)           null,
   constraint PK_DETAILEDCLASSIFICATION primary key nonclustered (detailed_id, detailed_name)
)


create index Relationship_2_FK on detailedclassification (
thematic_id ASC,
thematic_name ASC
)

create table orderDetails (
   order_id             varchar(1)           not null,
   order_name           varchar(1)           null,
   order_numbers        int                  not null,
   order_create_time    datetime             null,
   order_update_time    datetime             not null,
   constraint PK_ORDERDETAILS primary key nonclustered (order_id)
)

create table productInformation (
   product_id           varchar(1)           not null,
   product_name         varchar(1)           not null,
   banner_id            varchar(1)           null,
   banner_product_id    varchar(1)           null,
   banner_updata_time   datetime             null,
   product_stock        double precision     null,
   product_description  text                 null,
   product_status       int                  null,
   product_type         int                  null,
   product_time         datetime             not null,
   product_updata_time  datetime             not null,
   constraint PK_PRODUCTINFORMATION primary key nonclustered (product_id, product_name)
)

create index Relationship_11_FK on productInformation (
banner_id ASC,
banner_product_id ASC,
banner_updata_time ASC
)

create table shoppingCart (
   cart_id              varchar(1)           not null,
   cart_name            varchar(1)           not null,
   cart_number          float                not null,
   cart_sum             char(10)             not null,
   cart_img             varchar(1)           not null,
   cart_status          bit                  not null,
   user_id              varchar(1)           null,
   user_name            varchar(1)           null,
   user_description     varchar(1)           null,
   cart_create_time     datetime             null,
   constraint PK_SHOPPINGCART primary key nonclustered (cart_id, cart_name, cart_number, cart_sum, cart_img, cart_status)
)

create index Relationship_18_FK on shoppingCart (
user_id ASC,
user_name ASC,
user_description ASC
)

create table show (
   show_id              varchar(1)           not null,
   show_name            varchar(1)           not null,
   show_img             image                not null,
   detailed_id          varchar(1)           null,
   detailed_name        varchar(1)           null,
   show_description     varchar(1)           null,
   constraint PK_SHOW primary key nonclustered (show_id, show_name, show_img)
)

create index Relationship_22_FK on show (
detailed_id ASC,
detailed_name ASC
)

create table thematicclassification (
   thematic_id          varchar(1)           not null,
   thematic_name        varchar(1)           not null,
   constraint PK_THEMATICCLASSIFICATION primary key nonclustered (thematic_id, thematic_name)
)


create table userInformation (
   user_id              varchar(1)           not null,
   user_name            varchar(1)           not null,
   user_img             image                null,
   user_sex             bit                  null,
   user_age             int                  null,
   user_date            datetime             null,
   user_description     varchar(1)           not null,
   cart_id              varchar(1)           null,
   cart_name            varchar(1)           null,
   cart_number          float                null,
   cart_sum             char(10)             null,
   cart_img             varchar(1)           null,
   cart_status          bit                  null,
   constraint PK_USERINFORMATION primary key nonclustered (user_id, user_name, user_description)
)

create index Relationship_19_FK on userInformation (
cart_id ASC,
cart_name ASC,
cart_number ASC,
cart_sum ASC,
cart_img ASC,
cart_status ASC
)


