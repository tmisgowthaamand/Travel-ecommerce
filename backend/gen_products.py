import json, uuid, random

with open('new_products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

meta_details = [
    'Ultra-durable lightweight shell',
    '360-degree silent spinner wheels',
    'Integrated TSA combination lock',
    'Adjustable telescopic handle',
    'Internal multi-pocket organization',
    'Impact-resistant reinforced corners',
    'Water-resistant interior lining',
    'Expandable zipper for extra capacity'
]

output = []
for p in products:
    p_id = 'str(uuid.uuid4())'
    orig_price = round(p['price'] * 1.25, 2)
    rating = round(random.uniform(4.2, 4.9), 1)
    reviews = random.randint(40, 450)
    details = random.sample(meta_details, 4)
    tags = p.get('tags', [])
    
    # Escape quotes in description for python string literal
    desc = p["description"].replace('"', '\\"')
    
    s = f'        {{\n'
    s += f'            \"id\": {p_id},\n'
    s += f'            \"name\": \"{p["name"]}\",\n'
    s += f'            \"description\": \"{desc}\",\n'
    s += f'            \"price\": {p["price"]},\n'
    s += f'            \"original_price\": {orig_price},\n'
    s += f'            \"category\": \"luggage\",\n'
    s += f'            \"image\": \"{p["image"]}\",\n'
    s += f'            \"images\": [\"{p["image"]}\"],\n'
    s += f'            \"rating\": {rating},\n'
    s += f'            \"reviews_count\": {reviews},\n'
    s += f'            \"in_stock\": True,\n'
    s += f'            \"featured\": {p.get("featured", False)},\n'
    s += f'            \"tags\": {json.dumps(tags)},\n'
    s += f'            \"details\": {json.dumps(details)}\n'
    s += f'        }}'
    output.append(s)

with open('formatted_products.txt', 'w', encoding='utf-8') as f:
    f.write(',\n'.join(output))
