import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: 'Кокосовое масло', description: 'Натуральное масло для волос и кожи', price: 599, image: 'https://cdn.poehali.dev/projects/b756d888-7350-4673-9e15-626462b2612a/files/ea3d3bd2-1015-4061-ab20-a02b90067ffb.jpg', category: 'cosmetics' },
  { id: 2, name: 'Тайская маска для лица', description: 'С экстрактом лотоса и риса', price: 450, image: 'https://cdn.poehali.dev/projects/b756d888-7350-4673-9e15-626462b2612a/files/456a8ae5-24c9-42d1-bb96-dcdfee00a45a.jpg', category: 'cosmetics' },
  { id: 3, name: 'Бальзам Tiger Balm', description: 'Красный бальзам для мышц', price: 350, image: 'https://cdn.poehali.dev/projects/b756d888-7350-4673-9e15-626462b2612a/files/3eb95115-1248-4e28-bf50-639a1c7ec617.jpg', category: 'cosmetics' },
  { id: 4, name: 'Мангустиновое мыло', description: 'Антибактериальное натуральное мыло', price: 250, image: 'https://cdn.poehali.dev/projects/b756d888-7350-4673-9e15-626462b2612a/files/d4bc5358-adcf-4ba2-a3c6-ec70b578ff53.jpg', category: 'cosmetics' },
  { id: 5, name: 'Скраб для тела', description: 'С ароматом жасмина и цветов', price: 550, image: 'https://cdn.poehali.dev/projects/b756d888-7350-4673-9e15-626462b2612a/files/9ab976cb-9e89-4eeb-81f3-40e0620ed887.jpg', category: 'cosmetics' },
  
  { id: 6, name: 'Том Ям паста', description: 'Классическая паста для супа', price: 299, image: 'https://cdn.poehali.dev/projects/b756d888-7350-4673-9e15-626462b2612a/files/25c7523a-1d8e-4039-9adb-a6414302c1d7.jpg', category: 'spices' },
  { id: 7, name: 'Тайский базилик', description: 'Сушёный базилик высшего качества', price: 199, image: 'https://cdn.poehali.dev/projects/b756d888-7350-4673-9e15-626462b2612a/files/fc6ebcf2-84d1-46c3-97da-d71426e9368c.jpg', category: 'spices' },
  { id: 8, name: 'Кафир-лайм листья', description: 'Ароматные листья для карри', price: 249, image: 'https://cdn.poehali.dev/projects/b756d888-7350-4673-9e15-626462b2612a/files/3d44d00f-5956-4f1b-8180-7539a2feec96.jpg', category: 'spices' },
  { id: 9, name: 'Набор специй', description: 'Полный набор для тайской кухни', price: 899, image: 'https://cdn.poehali.dev/projects/b756d888-7350-4673-9e15-626462b2612a/files/29b1d78d-53b5-45e3-a402-dbd49049feed.jpg', category: 'spices' },
  { id: 10, name: 'Галангал корень', description: 'Молотый корень для супов', price: 349, image: 'https://cdn.poehali.dev/projects/b756d888-7350-4673-9e15-626462b2612a/files/4e37edc0-e814-4ea8-a180-4c073b0c31d9.jpg', category: 'spices' },
  
  { id: 11, name: 'Статуэтка Будды', description: 'Бронзовая статуэтка 15 см', price: 1499, image: 'https://cdn.poehali.dev/projects/b756d888-7350-4673-9e15-626462b2612a/files/a84eb34c-99c9-4926-9b6f-c1fa2c9eb4d8.jpg', category: 'souvenirs' },
  { id: 12, name: 'Тайский веер', description: 'Расписной веер ручной работы', price: 699, image: 'https://cdn.poehali.dev/projects/b756d888-7350-4673-9e15-626462b2612a/files/4a9a2ec7-9a5f-471f-9d21-047e25d4ef3e.jpg', category: 'souvenirs' },
  { id: 13, name: 'Слон из дерева', description: 'Резная фигурка из тикового дерева', price: 1299, image: 'https://cdn.poehali.dev/projects/b756d888-7350-4673-9e15-626462b2612a/files/52dc6c56-f4a0-4557-b76d-5b757f485747.jpg', category: 'souvenirs' },
  { id: 14, name: 'Ловец снов', description: 'Традиционный тайский оберег', price: 799, image: 'https://cdn.poehali.dev/projects/b756d888-7350-4673-9e15-626462b2612a/files/8c8fdc66-0e23-45f0-bb58-8192b28452e6.jpg', category: 'souvenirs' },
  { id: 15, name: 'Шёлковый платок', description: 'Натуральный шёлк с узорами', price: 2499, image: 'https://cdn.poehali.dev/projects/b756d888-7350-4673-9e15-626462b2612a/files/bf1b826b-ea14-4938-bc9e-8e2f9b9abc19.jpg', category: 'souvenirs' },
];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast({
      title: "Товар добавлен!",
      description: `${product.name} добавлен в корзину`,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Спасибо за обращение!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-2xl">🪷</span>
              </div>
              <h1 className="text-2xl font-bold text-primary">Алый Лотос</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              {['Главная', 'Каталог', 'Доставка', 'Оплата', 'Справка', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button size="sm" variant="outline" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {getTotalItems() > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {getTotalItems()}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="text-2xl">Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <Icon name="ShoppingCart" size={64} className="mx-auto text-muted-foreground mb-4" />
                        <p className="text-lg text-muted-foreground">Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        {cart.map((item) => (
                          <Card key={item.id}>
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold mb-1">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground mb-2">{item.price} ₽</p>
                                  <div className="flex items-center gap-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="ml-auto text-destructive"
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                      <Icon name="Trash2" size={16} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <Separator className="my-4" />
                        <div className="space-y-2">
                          <div className="flex justify-between text-lg">
                            <span>Товаров:</span>
                            <span className="font-semibold">{getTotalItems()} шт</span>
                          </div>
                          <div className="flex justify-between text-2xl font-bold">
                            <span>Итого:</span>
                            <span className="text-primary">{getTotalPrice()} ₽</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full mt-6" 
                          size="lg"
                          onClick={() => {
                            toast({
                              title: "Спасибо за заказ!",
                              description: "Мы свяжемся с вами для подтверждения.",
                            });
                            setCart([]);
                            setIsCartOpen(false);
                          }}
                        >
                          Оформить заказ
                          <Icon name="ArrowRight" size={20} className="ml-2" />
                        </Button>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
              <Button size="sm" className="md:hidden">
                <Icon name="Menu" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section id="главная" className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 py-20 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://cdn.poehali.dev/projects/b756d888-7350-4673-9e15-626462b2612a/files/b669bd83-1145-43b9-9f99-190adc1ec595.jpg" 
            alt="Thai pattern" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 px-4 py-2 text-sm" variant="secondary">
              Аутентичные товары из Таиланда
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Добро пожаловать в мир <span className="text-primary">тайских товаров</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Косметика, специи и сувениры с доставкой по России. Только оригинальная продукция из Таиланда
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" onClick={() => scrollToSection('каталог')} className="group">
                Посмотреть каталог
                <Icon name="ArrowRight" size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('контакты')}>
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="каталог" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Каталог товаров</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Выберите категорию и найдите идеальный товар для себя
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12">
              <TabsTrigger value="all">Все товары</TabsTrigger>
              <TabsTrigger value="cosmetics">Косметика</TabsTrigger>
              <TabsTrigger value="spices">Специи</TabsTrigger>
              <TabsTrigger value="souvenirs">Сувениры</TabsTrigger>
            </TabsList>

            <TabsContent value={activeCategory} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <Card 
                    key={product.id} 
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden aspect-square">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                          {product.category === 'cosmetics' ? '💄 Косметика' : 
                           product.category === 'spices' ? '🌶️ Специи' : 
                           '🎁 Сувениры'}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                      <Button onClick={() => addToCart(product)}>
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="доставка" className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Способы доставки</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: 'Truck', title: 'Курьерская', desc: 'По Москве 1-2 дня', price: '350 ₽' },
                { icon: 'Package', title: 'Почта России', desc: 'По всей России 5-14 дней', price: 'от 250 ₽' },
                { icon: 'Store', title: 'Самовывоз', desc: 'Пункты выдачи в городе', price: 'Бесплатно' },
              ].map((method, i) => (
                <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Icon name={method.icon as any} size={32} className="text-primary" />
                    </div>
                    <CardTitle>{method.title}</CardTitle>
                    <CardDescription>{method.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary">{method.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="оплата" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Способы оплаты</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: 'CreditCard', title: 'Банковские карты', desc: 'Visa, MasterCard, МИР' },
                { icon: 'Wallet', title: 'Электронные кошельки', desc: 'ЮMoney, QIWI, WebMoney' },
                { icon: 'Smartphone', title: 'СБП', desc: 'Мгновенные переводы' },
                { icon: 'Banknote', title: 'Наличные', desc: 'При получении курьером' },
              ].map((method, i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Icon name={method.icon as any} size={24} className="text-secondary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{method.title}</CardTitle>
                      <CardDescription>{method.desc}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="справка" className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Часто задаваемые вопросы</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Как проверить подлинность товара?</AccordionTrigger>
                <AccordionContent>
                  Все товары поставляются напрямую из Таиланда с сертификатами качества. На каждом товаре есть уникальный код для проверки подлинности на официальном сайте производителя.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Какие сроки доставки?</AccordionTrigger>
                <AccordionContent>
                  По Москве — 1-2 дня курьером, по России через Почту России — 5-14 дней в зависимости от региона. Также доступен самовывоз из пунктов выдачи.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Можно ли вернуть товар?</AccordionTrigger>
                <AccordionContent>
                  Да, вы можете вернуть товар в течение 14 дней с момента получения, если он не был в употреблении. Возврат денег осуществляется в течение 3-5 рабочих дней.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Есть ли у вас программа лояльности?</AccordionTrigger>
                <AccordionContent>
                  Да! При каждой покупке вы получаете бонусные баллы, которые можно использовать для оплаты следующих заказов. 1 балл = 1 рубль.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section id="контакты" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Свяжитесь с нами</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Наши контакты</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Телефон</p>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">info@alyi-lotos.ru</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Адрес</p>
                      <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Режим работы</p>
                      <p className="text-muted-foreground">Пн-Вс: 9:00 - 21:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Форма обратной связи</CardTitle>
                  <CardDescription>
                    Оставьте заявку и мы свяжемся с вами в ближайшее время
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input 
                        placeholder="Ваше имя" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Input 
                        type="email" 
                        placeholder="Email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Textarea 
                        placeholder="Ваше сообщение" 
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Отправить сообщение
                      <Icon name="Send" size={18} className="ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🪷</span>
                <h3 className="text-xl font-bold">Алый Лотос</h3>
              </div>
              <p className="text-white/70">
                Магазин аутентичных тайских товаров с доставкой по России
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Косметика</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Специи</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Сувениры</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">О компании</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Оплата</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Возврат</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-3">
                {['Instagram', 'Facebook', 'MessageCircle'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Icon name={social as any} size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/70">
            <p>&copy; 2024 Алый Лотос. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;