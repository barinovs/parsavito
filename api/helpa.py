l_fields = ['dateAdded','url','name','city','price','kpp','vin','mileage','enginePower','numberOfDoors','owners','conditionState','engineType','wheel','color','engineCapacity','model','yearIssue','bodyType','del']
tableName = 'ads'

 # I N S E R T
# for f in l_fields:
#     print('public $' + f)
#
# s = """$query = "INSERT INTO ads
#           SET """
#
# n = 1
# for f in l_fields:
#     if n < len(l_fields):
#         s += f + ':' + f + ', '
#     else:
#         s += f + ':' + f
#     n += 1
#
# s += '\n\n$stmt = $this->conn->prepare($query);\n'
#
# for f in l_fields:
#     s += '$' + f + ' = sanitize($this->' + f + ');\n'
#
# s += '\n\n'
#
# for f in l_fields:
#     s += "$stmt->bindParam(':" + f + "', $" + f + ");\n"

 # R E A D  A L l



s = 'public function readAll() {\n'
s += '  $query = "SELECT '

n = 1
for f in l_fields:
    if n < len(l_fields):
        s += f + ', '
    else:
        s += f + '\n'
    n += 1

s += '            FROM ' + tableName + '"\n'
s += '  $stmt = $this->conn->prepare($query);\n'
s += '  $stmt->execute();\n'
s += '  $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);\n'
s += '  return json_encode($tasks);\n'
s += '}'

print(s)
