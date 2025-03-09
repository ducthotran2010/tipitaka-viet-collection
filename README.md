# Tipiṭaka Việt

Tổng hợp và chuyển đổi các Kinh điển Pāli cùng Chú giải thành định dạng Markdown để chuẩn bị cho Embedding model hoặc Large Language model (LLM).

## Danh sách các Kinh điển và Chú giải được tổng hợp

- Sutta Tipiṭaka (Kinh tạng)
  - Aṅguttara Nikāya (Tăng chi bộ)
  - Dīgha Nikāya (Trường bộ)
  - Khuddaka Nikāya (Tiểu bộ)
    - Buddhavaṁsa (Phật sử)
    - Cariyāpiṭaka (Sở Hạnh Tạng)
    - Milindapañha (Milinda Vấn Đạo)
    - Paṭisambhidāmagga (Phân Tích Đạo)
    - Petavatthu (Chuyện Ngạ Quỷ)
    - Therāpadāna (Thánh Nhân Ký Sự)
    - Theragāthā (Trưởng Lão Kệ)
    - Therīapadāna (Trưởng Lão Ni Ký Sự)
    - Therīgāthā (Trưởng Lão Ni Kệ)
    - Vimānavatthu (Chuyện Thiên Cung)
  - Majjhima Nikāya (Trung bộ)
  - Saṁyutta Nikāya (Tương ưng bộ)
- Vinaya Tipiṭaka (Luật tạng)
- Aṭṭhakathā
  - Chú giải Trung bộ kinh
  - Chú giải Kinh pháp cú (Dhammapada Aṭṭhakathā) - Dịch giả Trưởng lão Pháp Minh
  - Thanh Tịnh Đạo (Visuddhimagga) - Ni Sư Trí Hải dịch Việt ngữ

## Cấu trúc thư mục

- `sources/`: thư mục tổng hợp nguồn Kinh điển và Chú giải
- `dist/`: thư mục chứa các file đã chuyển đổi thành Markdown

### Thư mục `dist`

```
dist
├── legacy-suttacentral-data          <-- Nguồn từ suttacentral.net
│   └── text
│       └── vn
│           └── pi
│               ├── su                <-- Sutta Tipiṭaka (Kinh tạng)
│               │   ├── an/**.md      <-- Aṅguttara Nikāya (Tăng chi bộ)
│               │   ├── dn/**.md      <-- Dīgha Nikāya (Trường bộ)
│               │   ├── kn/**.md      <-- Khuddaka Nikāya (Tiểu bộ)
│               │   ├── mn/**.md      <-- Majjhima Nikāya (Trung bộ)
│               │   └── sn/**.md      <-- Saṁyutta Nikāya (Tương ưng bộ)
│               └── vi/**.md          <-- Vinaya Tipiṭaka (Luật tạng)
└── others                            <-- Chú giải được tổng hợp từ các nguồn khác
```

## Đóng góp

1. Fork kho lưu trữ này.
2. Tạo một nhánh mới (`git checkout -b nhanh-tinh-nang`).
3. Thực hiện các thay đổi của bạn.
4. Commit các thay đổi (`git commit -am 'Thêm tính năng mới'`).
5. Đẩy lên nhánh (`git push origin nhanh-tinh-nang`).
6. Tạo một Pull Request mới.
