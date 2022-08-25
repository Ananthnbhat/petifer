import base64

class Ml():
    def compare(self, data):

        print(data)
        f = open(data['image'], 'rb')
        image = f.read()
        f.close()

        encodedimage = base64.b64encode(image)

        results = [{
            'accuracy': 1,
            'image': encodedimage
        }]
        return results