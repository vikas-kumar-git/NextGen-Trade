from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from django.urls import reverse

User = get_user_model()


class PredictAPITest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="testpass123"
        )
        self.client.force_authenticate(user=self.user)

    def test_predict_without_ticker(self):
        url = reverse('predict')
        response = self.client.post(url, {})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class PredictionListTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="testpass123"
        )
        self.client.force_authenticate(user=self.user)

    def test_empty_prediction_list(self):
        url = reverse('predictions')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_delete_own_prediction(self):
        prediction = self.user.predictions.create(
            ticker="AAPL",
            metrics={"next_day_price": 100, "rmse": 1},
            plot_urls=[],
        )

        url = reverse('prediction-detail', kwargs={'pk': prediction.pk})
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(self.user.predictions.filter(pk=prediction.pk).exists())

    def test_cannot_delete_other_users_prediction(self):
        other_user = User.objects.create_user(
            username="otheruser",
            password="testpass123",
        )
        prediction = other_user.predictions.create(
            ticker="MSFT",
            metrics={"next_day_price": 200, "rmse": 2},
            plot_urls=[],
        )

        url = reverse('prediction-detail', kwargs={'pk': prediction.pk})
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertTrue(other_user.predictions.filter(pk=prediction.pk).exists())
