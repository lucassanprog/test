using medcursos.models;

namespace medcursos.repository
{
    public class ProductRepository
    {
        public static List<Product> Product = new()
        {
            new() { Id = 1, Title = "MedCurso", Description = "O MEDCURSO foi concebido para os estudantes do 5º ano da graduação médica. Assim, todo o conteúdo didático é formatado da maneira tradicional: ao focarmos determinada doença (hepatite, por exemplo), partimos de sua etiopatogenia e caminhamos em direção às manifestações clínicas, diagnóstico e tratamento.", QuantitySold = 1200, ImageUrl = "http://d1y36np0qkbzyh.cloudfront.net/institucional-v2/images/home/medcurso.png" },
            new() { Id = 2, Title = "MedMaster", Description = "O Medmaster é um programa de fidelidade do MEDGRUPO desenvolvido em retribuição à confiança empenhada por todos os ex-alunos do MEDGRUPO dos últimos anos.", QuantitySold = 3500, ImageUrl = "http://d1y36np0qkbzyh.cloudfront.net/institucional-v2/images/home/logo_medmaster.png" },
            new() { Id = 3, Title = "MedSoft", Description = "Aulas, material didático, treinamento com questões e SmartCards, mentoria, planejamento de estudos e a revolucionária inteligência do MEDSmart estarão ali te esperando.", QuantitySold = 2569, ImageUrl = "http://apostilas-readerpro.s3.sa-east-1.amazonaws.com/imagens-componentes/imagem_medsoft.png" },
            new() { Id = 4, Title = "Revalida", Description = "Aulas, material didático, treinamento com questões e SmartCards, mentoria, planejamento de estudos e a revolucionária inteligência do MEDSmart estarão ali te esperando.", QuantitySold = 3500, ImageUrl = "http://apostilas-readerpro.s3.sa-east-1.amazonaws.com/imagens-componentes/imagem_medsoft.png" },
        };
    }
}
