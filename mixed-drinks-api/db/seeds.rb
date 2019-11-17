# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

######################### DRINKS ######################

# Name: “Peach Bellini”
# Potential Alcohols: [“Champagne”, “Prosecco”]
# Flavors: [“Sweet”, “Fruity”]
# Color: “Orange”
# Picture: “img url here”
# Picture credit: “Wherever picture got from” STRETCH 
# Types: [“Casual”, “Easily Classed Up”, “Bubbly”]
# Recipe: “tons of champagne and 1 ml peach juice”
# Recipe_from: “URL site recipe from”
# Additional Notes: “”


 
#  ALCOHOLS 
champagne = "Champagne"
prosecco = "Prosecco"
vodka = "Vodka"
gin = "Gin"
whiskey = "Whiskey"
tequila = "Tequila"
brandy = "Brandy"
cognac = "cognac"
rum = "Rum"
absinthe = "Absinthe"
cachaca = "Cachaça"
scotch = "Scotch"
vermouth = "Vermouth"
soju = "Soju"
mezcal = "Mezcal" 
armagnac = "Armagnac" 
pisco = "Pisco" 
baijiu  = "Baijiu " 
bourbon = "Bourbon" 
rye_whiskey = "Rye Whiskey" 
triple_sec = "Triple Sec" 
campari = "Campari" 
cointreau = "Cointreau" 
white_rum = "White Rum"  
dark_rum = "Dark Rum" 
kahlua = "Kahlua" 
baileys = "Baileys" 
sherry = "Sherry" 
white_wine = "White Wine"
red_wine = "Red Wine"
beer = "Beer"
calvados = "Calvados"
sake = "sake"
# ??????

# APERTIFS
aperol = "Aperol" 
ouzo = "Ouzo"
raki = "Raki"

# LIQUERS
liquer = "Liquer" 
chambord = "Chambord" 
amaretto = "Amaretto Liqueur" 
rasp_liquer = "Raspberry Liqueur"
coffee_liqueur = "Coffee Liqueur"
maraschino_liqueur = "Maraschino liqueur"
creme_de_cassis = "Crème de cassis"
creme_de_cacao = "Crème de cacao"
creme_de_menthe = "Crème de menthe"


##### FLAVORS ##### 

sweet = "Sweet"
semi_sweet  = "Semi-sweet"
bitter = "Bitter"
complex = "Complex"
spicy = "Spicy (Hot)"
spiced = "Spiced "
creamy = "Creamy"
minty = "Minty"
herbal = "Herbal (Floral)"
fruity = "Fruity"
savory = "Savory"
citrus = "Citrus"
sour = "Sour"
coffee = "Coffee"
ginger = "Ginger"
mulled = "Mulled"
smoky = "Smoky"
dry = "Dry"
cinnamon = "Cinnamon"
apertif = "Apertif" 

#  .TYPES 

classy = "Classy"
classic = "Classic"
casual = "Casual"
easily_classed_up = "Easily Classed Up"
easy_to_make = "Easy To Make"
hard_to_make = "Hard To Make"
cheap = "Cheap"
expensive = "Expensive"
party = "Party/Celebration"
college = "College"
frozen = "Frozen"
hot = "Hot"
bubbly = "Bubbly"
unique = "Unique"
holiday = "Holiday"
themed = "Themed"
iba_unforgettable = "IBA Unforgettables"
iba_classic = "IBA Contemporary Classics"
iba_new = "IBA New Era"
apertif = "Apertif" 
digestif = "Digestif"

#  COLORS

red = "Red"
pink = "Pink"
orange = "Orange"
yellow = "Yellow"
green = "Green"
blue = "Blue"
purple = "Purple"
white = "White"
clear = "Clear"
brown = "Brown"
amber = "Amber"
multicolored = "Multicolored"

Drink.destroy_all

kir = Drink.create(
name: "Kir",
alcohols: [white_wine, creme_de_cassis],
flavors: [sweet, fruity],
types: [classy, party, easy_to_make, cheap, iba_classic, apertif],
color: red,
picture_url: "https://253qv1sx4ey389p9wtpp9sj0-wpengine.netdna-ssl.com/wp-content/uploads/2018/03/Kir_GettyImages-539236665_1920x1280-700x461.jpg",
picture_credit: "Getty Images (from Winemag.com)",
recipe: "4 1/2 ounces Aligoté (or other dry white wine),
3/4 ounce Crème de Cassis",
recipe_url: "https://www.winemag.com/recipe/the-classic-kir-cocktail/",
additional_notes: "The Kir can easily be made into a Kir Royale by replacing the white
wine used with champagne. Traditionally, aligotè wine is used to make a Kir."
)

kir_royale = Drink.create(
    name: "Kir Royale",
    alcohols: [champagne, creme_de_cassis],
    flavors: [sweet, fruity, bubbly],
    types: [classy, party, easy_to_make, cheap, apertif],
    color: pink,
    picture_url: "https://thecookful.com/wp-content/uploads/2015/12/kir-royale-DSC_2865-crop-portrait1.jpg",
    picture_credit: "The Cookful",
    recipe: "1 Tbsp. creme de cassis or Chambord,
    5 oz. cold Brut Champagne",
    recipe_url: "https://thecookful.com/kir-royale/#tasty-recipes-35592",
    additional_notes: "The Kir Royale is simply a Kir with champagne used instead of white wine.
    The addition of bubbles gives this drink a slight bite with the addition of bubbles."    
)

mint_julep = Drink.create(
    name: "Mint Julep",
    alcohols:[bourbon],
    flavors:[minty, sweet],
    types:[classic, hard_to_make, iba_classic, party],
    color: yellow,
    picture_url:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cold-refreshing-classic-mint-julep-royalty-free-image-526283900-1553696390.jpg?resize=768:*",
    picture_credit:"Getty Images",
    recipe:"1 oz. Bourbon,
        1 oz. simple syrup,
        4 mint leaves,
        1 c. crushed ice,
        1 sprig of fresh mint for garnish",
    recipe_url:"https://www.townandcountrymag.com/leisure/drinks/a26934000/classic-mint-julep-recipe/",
    additional_notes: "The mint julep is associated with the southern United States and the Kentucky Derby. It is often poured into a silver or pewter cup, allowing a frost to form."
)

alexander = Drink.create(
    name: "Alexander",
    alcohols: [gin, creme_de_cacao],
    flavors: [creamy],
    types:[classic, iba_unforgettable],
    color: white,
    picture_url: "https://content.mrbostondrinks.com/recipes/alexander-cocktail-no-1-gin/210/632.jpg",
    picture_credit:"mrbostondrinks.com",
    recipe:"1 Ounce(s) Gin,
    1 Ounce(s) White creme de cacao,
    1 Ounce(s) half-and-half,
    Freshly grated nutmeg",
    recipe_url:"https://mrbostondrinks.com/recipes/alexander-cocktail-no-1-gin",
    additional_notes: "The Alexander has a much more popular variation made with brandy, aptly named the Brandy Alexander."
)

brandy_alexander = Drink.create(
    name: "Brandy Alexander",
    alcohols:[brandy, creme_de_cacao],
    flavors:[creamy, sweet],
    types:[classic, digestif],
    color: white,
    picture_url:"https://static01.nyt.com/images/2014/11/30/magazine/30drink1/30drink1-articleLarge-v3.jpg",
    picture_credit: "cooking.nytimes.com",
    recipe: "1  oz. brandy,
    1  oz. crème de cacao,
    1  oz. heavy cream,
     Nutmeg",
    recipe_url: "https://cooking.nytimes.com/recipes/1017013-brandy-alexander",
    additional_notes: "Cognac is often the brandy of choice when making a Brandy Alexander."
)

americano = Drink.create(
    name: "Americano",
    alcohols: [campari, vermouth],
    flavors: [bitter, fruity],
    types: [iba_unforgettable, classic, easy_to_make, apertif],
    color: red,
    picture_url: "https://www.thespruceeats.com/thmb/IZXpDN6f6G0fprmPC-cHaxhF_PY=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/_americano-cocktail-recipe-759279-hero-5bc4ea1046e0fb00269949bd.jpg",
    picture_credit:"thespruceeats.com",
    recipe: "1 1/2 ounces Campari,
    1 1/2 ounces sweet vermouth,
    3 ounces soda water (or club soda, as needed to fill glass),
    Garnish: ​lemon twist or orange slice",
    recipe_url: "https://www.thespruceeats.com/americano-cocktail-recipe-759279",
    additional_notes: "The Americano serves as a heavy precursor to the Negroni, a similar drink made with gin."
    )

angel_face = Drink.create(
    name: "Angel Face",
    alcohols: [gin, "Apricot Brandy", calvados],
    flavors: [fruity, semi_sweet],
    types: [classy, easy_to_make, iba_unforgettable],
    color: amber,
    picture_url: "https://coupehalffull.files.wordpress.com/2016/09/dsc_40612.jpg?w=840",
    picture_credit: "coupehalffull.com",
    recipe: "1 oz gin,
        1 oz apricot brandy,
        1 oz Calvados",
    recipe_url: "https://coupehalffull.com/2016/10/12/cocktail-of-the-week-no-22-the-angel-face/",
    additional_notes: "It should be noted (as stated in the link to the recipe) that the apricot brandy to make the Angel Face does not usually refer to an actual brandy, but 
    rather apricot liquers. (Some 'true' apricot brandies are available, but are rare.)"
)

sake_bomb = Drink.create(
    name: "Sake Bomb",
    alcohols: [beer, sake],
    flavors: [bitter],
    types: [party, cheap, unique],
    color: amber,
    picture_url: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2008/5/27/0/GI0417_Sake-Bomb.jpg.rend.hgtvcom.826.620.suffix/1383077386124.jpeg",
    picture_credit:"foodnetwork.com",
    recipe: "5/8 ounces Kirin beer,
        1 1/4 ounces filtered sake",
    recipe_url: "https://www.foodnetwork.com/recipes/sake-bomb-recipe-1939092",
    additional_notes:""
)

lemon_drop = Drink.create(
    name: "Lemon Drop (Lemon Drop Martini)",
    alcohols: [vodka, triple_sec],
    flavors: [citrus, sweet],
    types: [easy_to_make, easily_classed_up, iba_new],
    color: yellow,
    picture_url: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/3/2/2/IG1B03F_Lemon-Drop-Cocktail_s4x3.jpg.rend.hgtvcom.826.620.suffix/1425396589696.jpeg",
    picture_credit:"foodnetwork.com",
    recipe: "2 oz Vodka,
        1⁄2 oz Triple sec,
        1 oz Simple syrup,
        1 oz Fresh lemon juice",
    recipe_url: "https://www.liquor.com/recipes/lemon-drop/#gs.bonhvp",
    additional_notes:"Lemon/citrus vodkas are also popular in making Lemon Drops, along with lemon liquers such as Limoncello."
)

godfather = Drink.create(
    name: "Godfather",
    alcohols: [scotch, amaretto],
    flavors: [semi_sweet, smoky],
    types: [classic, iba_classic, easy_to_make],
    color: amber,
    picture_url: "https://www.thespruceeats.com/thmb/rdShQoE386macPfS5M0VDwAUH_w=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/_godfather-cocktail-recipe-761446-hero-02-5bd07dd0c9e77c005172af6d.jpg",
    picture_credit:"thespruceeats.com",
    recipe: "1 1/2 ounces Scotch whisky,
             1/2 ounce amaretto liqueur",
    recipe_url: "https://www.thespruceeats.com/godfather-cocktail-recipe-761446",
    additional_notes:"This drink gets its name from being the apple of Marlon Brando's (the main actor in The Godfather) eye. It
    also has several 'familial' variations, including the Godmother, Godson, and Godaughter. It is very similar in structure to the Rusty Nail."
)

godmother = Drink.create(
    name: "Godmother",
    alcohols: [vodka, amaretto],
    flavors: [semi_sweet, smoky],
    types: [classic, iba_classic, classy, easy_to_make],
    color: amber,
    picture_url: "https://www.thespruceeats.com/thmb/hjyW4yJSXjW9cTQCq9fdFvNbbR4=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/godmother-cocktail-5aad07ce6bf0690038bdc95a.jpg",
    picture_credit:"thespruceeats.com",
    recipe: "1 1/2 ounces vodka,
1/2 ounce amaretto",
    recipe_url: "https://www.thespruceeats.com/godmother-cocktail-recipe-761065",
    additional_notes:"The Godmother is a vodka variation on the Godfather, and devises its name from that." 
)

godson = Drink.create(
    name: "Godson",
    alcohols: [scotch, amaretto],
    flavors: [sweet],
    types: [easy_to_make],
    color: amber,
    picture_url: "http://www.seemydrink.com/media/filter/xl/476763_382069398472971_211362352210344_1568442_619050132_o.jpg",
    picture_credit:"seemydrink.com",
    recipe: "2	parts  Scotch,
        1	part  Amaretto,
        1	part  Sweet cream",
    recipe_url: "https://cocktailpartyapp.com/drinks/godson/",
    additional_notes:"The Godson is a variation on the Godfather where sweet cream is added." 
)

goddaughter = Drink.create(
    name: "Godaughter",
    alcohols: [vodka, amaretto],
    flavors: [sweet],
    types: [easy_to_make],
    color: white,
    picture_url: "https://www.thedrinkkings.com/wp-content/uploads/2016/04/Goddaughter-11-630-630x874.jpg",
    picture_credit:"thedrinkkings.com",
    recipe: "30ml. Vodka,
        30ml. Amaretto,
        30ml. Whipping cream,
        Grated fresh nutmeg, to garnish",
    recipe_url: "https://perfectcocktail.net/god-daughter/",
    additional_notes:"The Godaughter is a variation on the Godmother (which in turn itself is a variation of the Godfather) with the addition of sweet cream."
)

seven_and_seven = Drink.create(
    name: "Seven and Seven",
    alcohols: [whiskey],
    flavors: [citrus, bubbly],
    types: [classic, casual],
    color: amber,
    picture_url: "https://www.seagrams7.com/images/drinks/7-7.png",
    picture_credit:"seamgrams7.com",
    recipe: "1.5 oz. Seagram’s 7 Crown Blended Whiskey,
        5 oz. 7UP®,
        Slice of lime",
    recipe_url: "https://www.seagrams7.com/whiskey-drinks",
    additional_notes:"The Seven and Seven is named because it combines SevenUp and Seagrams7."
)

mojito = Drink.create(
    name: "Mojito",
    alcohols: [white_rum],
    flavors: [minty, sweet, citrus],
    types: [casual, iba_classic],
    color: green,
    picture_url: "https://assets.epicurious.com/photos/560d78877b55306961bf340c/6:4/w_620%2Ch_413/242527.jpg",
    picture_credit:"epicurious.com",
    recipe: "2 tablespoons (1 ounce) fresh lime juice,
        2 heaping teaspoons superfine sugar,
        1 cup crushed ice,
        12 fresh mint leaves, plus 5 small sprigs for garnish,
        1/4 cup (2 ounces) white rum,
        2 tablespoons (1 ounce) club soda",
    recipe_url: "https://www.epicurious.com/recipes/food/views/mojito-242527",
    additional_notes:"The Mojito originated in Cuba. Traditionally, sugar can juice is used in lieu of sugar."
)

white_russian = Drink.create(
    name: "White Russian",
    alcohols: [vodka, coffee_liqueur],
    flavors: [sweet, coffee],
    types: [easy_to_make, cheap, classic, digestif, ],
    color: white,
    picture_url: "https://drivito3.imgix.drizly.com/a5b9c7fe8f30294e/084c297a6cfb/WhiteRussian_Header.png?auto=format%2Ccompress&dpr=2&fm=jpeg&q=30&w=375",
    picture_credit:"drizly.com",
    recipe: "2 oz Vodka,
        1 oz Coffee Liqueur (Like Kahlua)
        1/2 oz Whole Milk or Heavy Cream
        Ice",
    recipe_url: "https://drizly.com/white-russian/r-2fbe8e9c69f7e86d",
    additional_notes:"The White Russian has somewhat of a cult status thanks to the movie The Big Lebowski."
)

manhattan = Drink.create(
    name: "Manhattan",
    alcohols: [whiskey, vermouth],
    flavors: [bitter, herbal],
    types: [easy_to_make, classic, iba_unforgettable],
    color: clear,
    picture_url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lede-1567179991.png?resize=768:*",
    picture_credit:"esquire.com",
    recipe: "2 oz. rye whiskey,
        1 oz. Italian vermouth
        2 dashes Angostura bitters",
    recipe_url: "https://www.esquire.com/food-drink/drinks/recipes/a3713/manhattan-drink-recipe/",
    additional_notes:""
)

sidecar = Drink.create(
    name: "Sidecar",
    alcohols: [cognac, triple_sec],
    flavors: [citrus, semi_sweet],
    types: [classic, iba_unforgettable],
    color: orange,
    picture_url: "http://www.eatout.co.za/wp-content/uploads/2018/11/The-Sidecar-350x435.jpg",
    picture_credit:"eatout.co.za",
    recipe: "Freshly squeezed lemon juice,
        Sugar
        1 cup Cognac or good brandy
        1/2 cup Triple Sec or Cointreau
        1/4 cup freshly squeezed lemon juice
        Maraschino cherries or lemon peel, to garnish",
    recipe_url: "https://www.foodnetwork.com/recipes/ina-garten/sidecar-cocktails-recipe-1941406",
    additional_notes:"The Sidecar supposedly gets its roots from the Brandy Crusta. However, the origins of this drink are highly debated."
)

gimlet = Drink.create(
    name: "Gimlet",
    alcohols: [gin],
    flavors: [citrus, semi_sweet],
    types: [easy_to_make, cheap, apertif],
    color: clear,
    picture_url: "https://www.tasteofhome.com/wp-content/uploads/2017/10/Gimlet_exps37181_HC2847498D03_28_3b_RMS-1-696x696.jpg",
    picture_credit:"tasteofhome.com",
    recipe: "Ice cubes,
        2 ounces gin
        1 ounce lime juice
        1 teaspoon confectioners' sugar
        Lime slices",
    recipe_url: "https://www.tasteofhome.com/recipes/gimlet/",
    additional_notes:"The most used brand of lime juice for the gimlet is Rose's Lime Juice. Some even say the drink isn't a gimlet if it isn't used."
)

gin_and_tonic = Drink.create(
    name: "Gin and Tonic",
    alcohols: [gin],
    flavors: [herbal, bitter],
    types: [classic, casual, easily_classed_up, easy_to_make],
    color: clear,
    picture_url: "https://assets.bonappetit.com/photos/57adf784f1c801a1038bcddf/16:9/w_1280,c_limit/gin-and-tonic.jpg",
    picture_credit:"bonappetit.com",
    recipe: "2 ounces gin (preferably Tanqueray),
        1–3 lime wedges
        3–4 ounces tonic water",
    recipe_url: "https://www.bonappetit.com/recipe/gin-and-tonic",
    additional_notes:"Most recipes usually add a lime wedge to gin and tonic, but this is not a strict requirement."
)

screwdriver = Drink.create(
    name: "Screwdriver",
    alcohols: [vodka],
    flavors: [sweet, citrus],
    types: [iba_unforgettable, classic, easy_to_make, cheap, casual],
    color: yellow,
    picture_url: "https://www.thespruceeats.com/thmb/u4k7ZTqmzDYYPmMcLfFhJ0Zty9A=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/popular-screwdriver-variations-759820-12-5b3f944ec9e77c003785d643.jpg",
    picture_credit: "thespruceeats.com",
    recipe: "2 ounces vodka,
5 ounces orange juice (or enough to fill)
Garnish: orange slice",
    recipe_url: "https://www.thespruceeats.com/popular-screwdriver-variations-759820",
    additional_notes: "The Screwdriver is traditionally served in a highball glass."
)

negroni = Drink.create(
    name: "Negroni",
    alcohols: [campari, gin, vermouth],
    flavors: [dry, sweet, bitter] ,
    types: [iba_unforgettable, classic, apertif],
    color: red,
    picture_url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/0-lede-1550237609.png?resize=768:*",
    picture_credit: "esquire.com",
    recipe: "1 oz. London dry gin,
        1 oz. Campari
        1 oz. vermouth rosso",
    recipe_url: "https://www.esquire.com/food-drink/drinks/recipes/a3683/negroni-drink-recipe/",
    additional_notes: "The Negroni was a favored drink of Ernest Hemingway and Orson Wells. It uses the Americano as a precursor. To make it properly, use vermouth rosso."
)


martini = Drink.create(
    name: "Martini",
    alcohols: [gin, vermouth],
    flavors: [dry, bitter],
    types: [classy, classic, iba_unforgettable, apertif],
    color: clear,
    picture_url: "https://assets.bonappetit.com/photos/57acf26253e63daf11a4dbc7/16:9/w_1280,c_limit/classic-martini-redo.jpg",
    picture_credit: "bonappetit.com",
    recipe: "4 ounces Beefeater gin,
        ¾ ounce Noilly Prat dry vermouth
        1 lemon",
    recipe_url: "https://www.bonappetit.com/recipe/classic-martini-2",
    additional_notes: "The Martini is a classic drink and has many fans, including Queen Elizabeth II."
)

vesper = Drink.create(
    name: "Vesper",
    alcohols: [gin, vodka, "Lillet Blanc"],
    flavors: [semi_sweet, bitter],
    types: [classy, iba_new],
    color: clear,
    picture_url: "https://cdn.liquor.com/wp-content/uploads/2018/01/29145254/vesper-720x720-recipe.jpg",
    picture_credit: "liquor.com",
    recipe: "3 oz Gin,
        1 oz Vodka
        1⁄2 oz Lillet blanc apéritif",
    recipe_url: "https://www.liquor.com/recipes/vesper/#gs.bzgvhk",
    additional_notes: "Originating in the Bond movie Casino Royale, the original Vesper recipe required Kina Lillet, a type of alcohol that is no longer produce. Lillet Blanc is the go-to substitute for it."
)

blackberry_sidecar = Drink.create(
    name: "Blackberry Sidecar",
    alcohols: [gin, triple_sec],
    flavors: [fruity, sour],
    types: [casual],
    color: purple,
    picture_url: "https://www.thespruceeats.com/thmb/RUULNGffhqYKlecl8A-BlX0nylk=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Brockmans-Blackberry-Sidecar-56ebf8813df78cb4b980f040.jpg",
    picture_credit: "thespruceeats.com",
    recipe: "4 blackberries,
        3/4 ounce triple sec
        1/2 ounce ​lemon juice (fresh)
        1 1/2 ounces gin (Brockmans Gin)
        1 dash plum bitters
        Garnish: lemon twist",
    recipe_url: "https://www.thespruceeats.com/blackberry-sidecar-recipe-760011",
    additional_notes: "Fruits like blackberries and lemons are freshest in the summer, making the season the perfect time to have this refreshing drink."
)

kamikaze = Drink.create(
    name: "Kamikaze",
    alcohols: [vodka, triple_sec],
    flavors: [citrus, sour, sweet],
    types: [casual, party, college],
    color: yellow,
    picture_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Kamikaze-cocktail.jpg/1024px-Kamikaze-cocktail.jpg",
    picture_credit: "wikipedia.org",
    recipe: "3/4 ounce freshly squeezed lime juice,
        3/4 ounce triple sec
        1 1/2 ounces vodka
        Ice
        Lime wedge for garnish",
    recipe_url: "https://cocktails.lovetoknow.com/vodka-drinks/kamikaze-drink-recipe",
    additional_notes: "The Kamikaze is similar in composition to a gimlet or margarita. It is also commonly served as a shot."
)

tequila_sunrise = Drink.create(
    name: "Tequila Sunrise",
    alcohols: [tequila],
    flavors: [sweet, citrus],
    types: [casual, cheap, iba_classic],
    color: multicolored,
    picture_url: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/5/28/1/KC0604H_Tequila-Sunrise_s4x3.jpg.rend.hgtvcom.826.620.suffix/1432831870492.jpeg",
    picture_credit: "foodnetwork.com",
    recipe: "1 1/2 ounces tequila,
    3/4 cup orange juice 
    3/4 ounce grenadine syrup 
    Orange slice, for garnish 
    High-quality maraschino cherry, such as Luxardo, for garnish" ,
    recipe_url: "https://www.foodnetwork.com/recipes/geoffrey-zakarian/tequila-sunrise-2810699",
    additional_notes: "The tequila sunrise is a favorite of Rolling Stones alum MIck Jagger."
)

aperol_spritz = Drink.create(
    name: "Aperol Spritz",
    alcohols: [champagne, aperol],
    flavors: [bubbly, herbal, bitter],
    types: [easy_to_make, classic, apertif],
    color: orange,
    picture_url: "https://cdn.liquor.com/wp-content/uploads/2019/04/24075106/Aperol-Spritz-720x720-recipe.jpg",
    picture_credit: "liquor.com",
    recipe: "3 oz Prosecco,
    2 oz Aperol
    1 oz Soda water",
    recipe_url: "https://www.liquor.com/recipes/aperol-spritz/#gs.d3dyjq",
    additional_notes: "The Aperol Spritz is a classic Italian drink."
)


frz_margarita = Drink.create(
    name: "Frozen Margarita",
    alcohols: [tequila, cointreau],
    flavors: [sweet, citrus, sour],
    types: [frozen, party],
    color: yellow,
    picture_url: "https://cdn.liquor.com/wp-content/uploads/2017/07/05150949/Frozen-Margarita-720x720-recipe.jpg",
    picture_credit: "liquor.com",
    recipe: "8  ounces blanco tequila,
        1  cup lime juice
        4  ounces triple sec preferably Cointreau
        2  ounces simple syrup
        4  cups ice
         Lime wheels or wedges, for garnish",
    recipe_url: "https://cooking.nytimes.com/recipes/1016360-frozen-margarita",
    additional_notes: "The frozen margarita goes excellently with spicy food to cut back its kick. It is a popular summer drink."
)


grasshopper = Drink.create(
    name: "Grasshopper",
    alcohols: [creme_de_menthe, creme_de_cacao],
    flavors: [minty, sweet],
    types: [digestif, iba_classic],
    color: green,
    picture_url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lede-1552514267.png?resize=768:*",
    picture_credit: "esquire.com",
    recipe: "1 oz. green crème de menthe,
        1 oz. white crème de cacao
        1 oz. heavy cream
        mint sprig",
    recipe_url: "https://www.esquire.com/food-drink/drinks/a26815938/grasshopper-cocktail-drink-recipe/",
    additional_notes: "The Grasshopper is often topped with shaved chocolate for a classier look and additional texture."
)

paloma = Drink.create(
    name: "Paloma",
    alcohols: [tequila],
    flavors: [citrus, bitter, sour, bubbly],
    types: [easy_to_make, casual],
    color: pink,
    picture_url: "https://cdn.liquor.com/wp-content/uploads/2017/11/06095937/paloma-720x720-recipe.jpg",
    picture_credit: "liquor.com",
    recipe: "2 oz Tequila,
        1⁄2 oz Fresh lime juice
        Grapefruit soda, to top",
    recipe_url: "https://www.liquor.com/recipes/paloma/#gs.db0hr2",
    additional_notes: "Popular in Mexico, the Paloma can also be prepared with grapefruit juice in lieu of soda"
)

irish_coffee = Drink.create(
    name: "Irish Coffee",
    alcohols: [whiskey],
    flavors: [coffee, bitter, sweet],
    types: [digestif, iba_classic],
    color: brown,
    picture_url: "https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto:eco,c_fit,w_760/https%3A%2F%2Fstorage.googleapis.com%2Fgen-atmedia%2F3%2F2012%2F03%2Fa84cba9e15919d13761dd6dbdff13c3c9fe1779d.jpeg",
    picture_credit: "thekitchn.com",
    recipe: "6 ounces hot, freshly brewed coffee,
        1 teaspoon granulated sugar
        1 teaspoon packed brown sugar
        1 1/2 ounces Irish whiskey
        Freshly whipped cream",
    recipe_url: "https://www.thekitchn.com/how-to-make-irish-coffee-167678",
    additional_notes: "The Irish Coffee is often made/mixed with Bailey's Irish Cream to make a more alcoholic version of the drink"
)



french_martini = Drink.create(
    name: "French Martini",
    alcohols: [vodka, rasp_liquer],
    flavors: [sweet, fruity],
    types: [classy, iba_new],
    color: pink,
    picture_url: "https://img.sndimg.com/food/image/upload/w_560,h_315,c_thumb,fl_progressive,q_80/v1/img/recipes/56/17/9/AiMGWlWySR61Ge2OXMEK_IAM_6001.jpg",
    picture_credit: "",
    recipe: "2 ounces vodka,
        1 ounce pineapple juice
        1⁄4 ounce Chambord raspberry liquor
        ice",
    recipe_url: "https://www.food.com/recipe/french-martini-56179",
    additional_notes: "Chambord is the prime choice of raspberry liquer in a French Martini."
)

penicillin = Drink.create(
    name: "Penicillin",
    alcohols: [scotch],
    flavors: [citrus, herbal, spicy],
    types: [classic, classy],
    color: yellow,
    picture_url: "https://cdn.liquor.com/wp-content/uploads/2016/03/25183103/penicillin-720x720.jpg",
    picture_credit: "liquor.com",
    recipe: "2 oz Blended scotch,
3⁄4 oz Fresh lemon juice
3⁄4 oz Honey-ginger syrup
1⁄4 oz Islay single-malt scotch",
    recipe_url: "https://www.liquor.com/recipes/penicillin/#gs.ebsega",
    additional_notes: "The Penicillin is a newer drink, created in 2005."
)

caipirinha = Drink.create(
    name: "Caipirinha",
    alcohols: [cachaca],
    flavors: [sweet, citrus],
    types: [casual, iba_classic],
    color: clear,
    picture_url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lede-1565357473.png?resize=768:*",
    picture_credit: "esquire.com",
    recipe: "2 oz. cachaça,
        1/2 lime
        2 tsp. sugar",
    recipe_url: "https://www.esquire.com/food-drink/drinks/recipes/a3884/caipirinha-drink-recipe/",
    additional_notes: "The Caipirinha is the national drink of Brazil."
)

french_75 = Drink.create(
    name: "French 75",
    alcohols: [champagne, gin],
    flavors: [citrus, herbal],
    types: [classic, classy, iba_classic],
    color: yellow,
    picture_url: "https://assets.bonappetit.com/photos/57acbe4753e63daf11a4d99a/16:9/w_1280,c_limit/french-75.jpg",
    picture_credit: "bonappetit.com",
    recipe: "2 ounces London dry gin,
        ¾ ounce fresh lemon juice,
        ¾ ounce simple syrup,
        2 ounces Champagne,
        Long spiral lemon twist (for serving)",
    recipe_url: "https://www.bonappetit.com/recipe/french-75-3",
    additional_notes: "The French 75 is named after a particular artillery gun from France due to its powerful punch"
)

casino = Drink.create(
    name: "Casino",
    alcohols: [gin, maraschino_liqueur],
    flavors: [sweet, citrus],
    types: [classic, iba_unforgettable],
    color: white,
    picture_url: "https://imbibemagazine.com/wp-content/uploads/2016/02/casino-cocktail-vertical-crdt-lara-ferroni-330x410.jpg",
    picture_credit: "imbibemagazine.com",
    recipe: "2 oz. Old Tom gin,
        1/4 oz. maraschino liqueur
        1/4 oz. fresh lemon juice
        2 dashes Regan’s orange bitters",
    recipe_url: "https://www.imbibemagazine.com/casino-old-tom-gin-cocktail/",
    additional_notes: "The Casino is quite an old drink, getting its origins from the Savoy Cocktail book published in 1930."
)

kentucky_flyer = Drink.create(
    name: "Kentucky Flyer",
    alcohols: [rye_whiskey, maraschino_liqueur],
    flavors: [semi_sweet],
    types: [easy_to_make],
    color: yellow,
    picture_url: "https://cdn.liquor.com/wp-content/uploads/2011/05/kentucky-flyer1.jpg",
    picture_credit: "liquor.com",
    recipe: "
    2 oz Rye whiskey,
3⁄4 oz Luxardo maraschino liqueur,
1⁄2 oz Fresh lemon juice",
    recipe_url: "https://www.liquor.com/recipes/kentucky-flyer/#gs.g3q186",
    additional_notes: "The Kentucky Flyer is very similar to the Avaition cocktail, preferring whiskey over gin and the absence of creme liqueurs. It's a bit more brusque in taste."
)

aviation = Drink.create(
    name: "Aviation",
    alcohols: [gin, maraschino_liqueur, creme_de_violette],
    flavors: [herbal, citrus],
    types: [iba_unforgettable, unique, easy_to_make],
    color: purple,
    picture_url: "https://cdn.liquor.com/wp-content/uploads/2019/01/22133711/aviation-new-720x720-recipe-1.jpg",
    picture_credit: "liquor.com",
    recipe: "2 oz Gin
    1⁄2 oz Maraschino liqueur
    1⁄4 oz Crème de violette or Crème Yvette
    3⁄4 oz Fresh lemon juice",
    recipe_url: "https://www.liquor.com/recipes/aviation/#gs.g3o7va",
    additional_notes: "The Aviation cocktail ranges from purple to sky blue. The purple comes from creme de violette, and the sky blue can be seen when it is mixed with the gin and lemon juice."
)

water_lily = Drink.create(
    name: "Water Lily",
    alcohols: [gin, triple_sec, creme_de_violette],
    flavors: [floral, citrus],
    types: [unique, classy],
    color: purple,
    picture_url: "https://www.saveur.com/resizer/J9qha0ryJ3Tqfx4SlxcytiWSnyk=/1034x689/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/QNIAB53FRHKQWGGQD7J7MVVKYE.jpg",
    picture_credit: "saveur.com",
    recipe: "3⁄4 oz. triple sec
        3⁄4 oz. crème de violette
        3⁄4 oz. fresh lemon juice
        3⁄4 oz. gin
        Strip of orange zest, for garnish",
    recipe_url: "https://www.saveur.com/article/recipes/water-lily/",
    additional_notes: "The Water Lily is somewhat similar in composition to the Aviation, with a more pronounced citrus note"
)

old_pal = Drink.create(
    name: "Old Pal",
    alcohols: ,
    flavors: ,
    types: ,
    color: ,
    picture_url: ,
    picture_credit: ,
    recipe: ,
    recipe_url: ,
    additional_notes:
)

# # = Drink.create(
# #     name: ,
# #     alcohols: ,
# #     flavors: ,
# #     types: ,
# #     color: ,
# #     picture_url: ,
# #     picture_credit: ,
# #     recipe: ,
# #     recipe_url: ,
# #     additional_notes:
# # )# # = Drink.create(
# #     name: ,
# #     alcohols: ,
# #     flavors: ,
# #     types: ,
# #     color: ,
# #     picture_url: ,
# #     picture_credit: ,
# #     recipe: ,
# #     recipe_url: ,
# #     additional_notes:
# # )# # = Drink.create(
# #     name: ,
# #     alcohols: ,
# #     flavors: ,
# #     types: ,
# #     color: ,
# #     picture_url: ,
# #     picture_credit: ,
# #     recipe: ,
# #     recipe_url: ,
# #     additional_notes:
# # )# # = Drink.create(
# #     name: ,
# #     alcohols: ,
# #     flavors: ,
# #     types: ,
# #     color: ,
# #     picture_url: ,
# #     picture_credit: ,
# #     recipe: ,
# #     recipe_url: ,
# #     additional_notes:
# # )# # = Drink.create(
# #     name: ,
# #     alcohols: ,
# #     flavors: ,
# #     types: ,
# #     color: ,
# #     picture_url: ,
# #     picture_credit: ,
# #     recipe: ,
# #     recipe_url: ,
# #     additional_notes:
# # )# # = Drink.create(
# #     name: ,
# #     alcohols: ,
# #     flavors: ,
# #     types: ,
# #     color: ,
# #     picture_url: ,
# #     picture_credit: ,
# #     recipe: ,
# #     recipe_url: ,
# #     additional_notes:
# # )# # = Drink.create(
# #     name: ,
# #     alcohols: ,
# #     flavors: ,
# #     types: ,
# #     color: ,
# #     picture_url: ,
# #     picture_credit: ,
# #     recipe: ,
# #     recipe_url: ,
# #     additional_notes:
# # )# # = Drink.create(
# #     name: ,
# #     alcohols: ,
# #     flavors: ,
# #     types: ,
# #     color: ,
# #     picture_url: ,
# #     picture_credit: ,
# #     recipe: ,
# #     recipe_url: ,
# #     additional_notes:
# # )# # = Drink.create(
# #     name: ,
# #     alcohols: ,
# #     flavors: ,
# #     types: ,
# #     color: ,
# #     picture_url: ,
# #     picture_credit: ,
# #     recipe: ,
# #     recipe_url: ,
# #     additional_notes:
# # )# # = Drink.create(
# #     name: ,
# #     alcohols: ,
# #     flavors: ,
# #     types: ,
# #     color: ,
# #     picture_url: ,
# #     picture_credit: ,
# #     recipe: ,
# #     recipe_url: ,
# #     additional_notes:
# # )# # = Drink.create(
# #     name: ,
# #     alcohols: ,
# #     flavors: ,
# #     types: ,
# #     color: ,
# #     picture_url: ,
# #     picture_credit: ,
# #     recipe: ,
# #     recipe_url: ,
# #     additional_notes:
# # )# # = Drink.create(
# #     name: ,
# #     alcohols: ,
# #     flavors: ,
# #     types: ,
# #     color: ,
# #     picture_url: ,
# #     picture_credit: ,
# #     recipe: ,
# #     recipe_url: ,
# #     additional_notes:
# # )# # = Drink.create(
# #     name: ,
# #     alcohols: ,
# #     flavors: ,
# #     types: ,
# #     color: ,
# #     picture_url: ,
# #     picture_credit: ,
# #     recipe: ,
# #     recipe_url: ,
# #     additional_notes:
# # )